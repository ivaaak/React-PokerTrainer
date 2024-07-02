export function decideAction(hand: Card[], playStyle: PlayStyle): 'raise' | 'call' | 'fold' {
    if (!Array.isArray(hand) || hand.length === 0) {
        console.error('Invalid hand:', hand);
        return 'fold';
    }

    const handStrength = evaluateHandStrength(hand);
    const stage = getStage(hand.length);

    // base score
    let score = handStrength * 10;

    // adjust score based on playstyle
    switch (playStyle) {
        case 'tightPassive':
            score -= 5;
            break;
        case 'loosePassive':
            score += 2;
            break;
        case 'tightAggressive':
            score += 0;
            break;
        case 'looseAggressive':
            score += 5;
            break;
    }

    // adjust score based on stage
    switch (stage) {
        case 'preflop':
            score += 0;
            break;
        case 'flop':
            score -= 5;
            break;
        case 'turn':
            score -= 10;
            break;
        case 'river':
            score -= 15;
            break;
    }

    // decision making
    if (score >= 80) {
        return playStyle.includes('Aggressive') ? 'raise' : 'call';
    } else if (score >= 50) {
        return playStyle.includes('Loose') ? 'call' : 'fold';
    } else {
        return playStyle.includes('Loose') ? 'call' : 'fold';
    }
}

function evaluateHandStrength(hand: Card[]): number {
    if (hand.length === 2) {
        return evaluatePreflopHand(hand);
    } else {
        return evaluatePostflopHand(hand);
    }
}

function evaluatePreflopHand(hand: Card[]): number {
    if (hand.length !== 2) {
        console.error('Invalid preflop hand:', hand);
        return 0;
    }
    const [card1, card2] = hand;
    if (!card1 || !card2) {
        console.error('Invalid cards in preflop hand:', hand);
        return 0;
    }
    const isPaired = cardRank(card1) === cardRank(card2);
    const isSuited = getSuit(card1) === getSuit(card2);
    const highCard = Math.max(cardRank(card1), cardRank(card2));
    const lowCard = Math.min(cardRank(card1), cardRank(card2));
    const gap = highCard - lowCard - 1;

    let score = highCard * 2 + lowCard - gap + (isSuited ? 2 : 0) + (isPaired ? (highCard * 2) : 0);
    return Math.min(Math.max(score, 0), 10);
}

function evaluatePostflopHand(hand: Card[]): number {
    // TODO check for flushes, straights, etc.
    const ranks = hand.map(card => cardRank(card));
    const suits = hand.map(card => card.suit);

    const hasPair = new Set(ranks).size < hand.length;
    const hasFlushDraw = new Set(suits).size <= 2;
    const hasStraightDraw = Math.max(...ranks) - Math.min(...ranks) <= 4;

    let score = 5;
    if (hasPair) score += 2;
    if (hasFlushDraw) score += 1;
    if (hasStraightDraw) score += 1;

    return score;
}

function cardRank(card: Card): number {
    const ranks = '23456789tjqka';
    let rank: string;

    if (typeof card === 'string') {
        rank = card[1];
    } else if (typeof card === 'object' && card !== null && 'rank' in card) {
        rank = card.rank;
    } else {
        console.error('Invalid card:', card);
        return 0;
    }

    rank = rank.toLowerCase();
    const index = ranks.indexOf(rank);
    if (index === -1) {
        console.error('Unknown rank:', rank);
        return 0;
    }
    return index + 2;
}

function getSuit(card: Card): string {
    if (typeof card === 'string') {
        return card[0];
    } else if (typeof card === 'object' && card !== null && 'suit' in card) {
        return card.suit;
    }
    console.error('Invalid card:', card);
    return '';
}


function getStage(handLength: number): 'preflop' | 'flop' | 'turn' | 'river' {
    switch (handLength) {
        case 2:
            return 'preflop';
        case 5:
            return 'flop';
        case 6:
            return 'turn';
        case 7:
            return 'river';
        default:
            throw new Error('Invalid hand length');
    }
}