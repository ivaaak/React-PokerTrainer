import { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import { decideAction } from '../decideCardAction';
import './CardGenerator.css'

export const CardGenerator: React.FC<{ mode: Mode, playstyle: PlayStyle }> = ({ mode, playstyle }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [action, setAction] = useState<'raise' | 'call' | 'fold' | null>(null);
    const [selectedAction, setSelectedAction] = useState<'raise' | 'call' | 'fold' | null>(null);
    const [animationClass, setAnimationClass] = useState<'correct' | 'incorrect' | null>(null);

    const generateCards = () => {
        let newCards: Card[] = [];

        if (mode === 'Preflop') {
            for (let i = 0; i < 2; i++) {
                newCards.push(generateUniqueRandomCard(cards));
            }
            const hand: [string, string] = [
                newCards[0].suit + newCards[0].rank,
                newCards[1].suit + newCards[1].rank
            ];
            const decidedAction = decideAction(hand, playstyle);
            setAction(decidedAction);
        } else if (mode === 'Flop') {
            for (let i = 0; i < 5; i++) {
                newCards.push(generateUniqueRandomCard(cards));
            }
        } else if (mode === 'River') {
            for (let i = 0; i < 6; i++) {
                newCards.push(generateUniqueRandomCard(cards));
            }
        } else if (mode === 'Turn') {
            for (let i = 0; i < 7; i++) {
                newCards.push(generateUniqueRandomCard(cards));
            }
        }

        setCards(newCards);
        setSelectedAction(null);
        setAnimationClass(null);
    };

    const generateUniqueRandomCard = (existingCards: Card[]) => {
        const suits = ['h', 'd', 'c', 's'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
        let suit: string, rank: string;
        do {
            suit = suits[Math.floor(Math.random() * suits.length)];
            rank = ranks[Math.floor(Math.random() * ranks.length)];
        } while (existingCards.some(card => card.suit === suit && card.rank === rank));
        return { suit, rank };
    }

    const handleActionSelect = (selectedAction: 'raise' | 'call' | 'fold') => {
        setSelectedAction(selectedAction);
        if (selectedAction === action) {
            setAnimationClass('correct');
        } else {
            setAnimationClass('incorrect');
        }
    }

    useEffect(() => {
        if (animationClass) {
            const timer = setTimeout(() => {
                generateCards();
            }, 1000); // Wait for 1 second before generating new cards
            return () => clearTimeout(timer);
        }
    }, [animationClass]);

    return (
        <div className='cardGenerator'>
            <button
                className="generate-button"
                onClick={generateCards}>
                Generate Cards
            </button>

            <div className={`cardContainer ${animationClass || ''}`}>
                {cards.length > 0 && (
                    <div className="firstTwoCardsContainer">
                        {cards.slice(0, 2).map((card, index) => (
                            <CardComponent key={index} card={card} />
                        ))}
                    </div>
                )}
                {cards.slice(2).map((card, index) => (
                    <CardComponent key={index + 2} card={card} />
                ))}
            </div>

            {action && (
                <div className="action-container">
                    Recommended action: {action}
                </div>
            )}

            <div className="button-container">
                <button 
                    className={`generate-button raiseButton ${selectedAction === 'raise' ? animationClass : ''}`}
                    onClick={() => handleActionSelect('raise')}
                >
                    Raise
                </button>
                <button 
                    className={`generate-button callButton ${selectedAction === 'call' ? animationClass : ''}`}
                    onClick={() => handleActionSelect('call')}
                >
                    Call
                </button>
                <button 
                    className={`generate-button foldButton ${selectedAction === 'fold' ? animationClass : ''}`}
                    onClick={() => handleActionSelect('fold')}
                >
                    Fold
                </button>
            </div>
        </div>
    );
}

export default CardGenerator;