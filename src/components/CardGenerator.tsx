import { useState } from 'react';
import CardComponent from './CardComponent';
import './CardGenerator.css'

export const CardGenerator: React.FC<{ mode: Mode }> = ({ mode }) => {
    const [cards, setCards] = useState<Card[]>([]);

    const generateCards = () => {
        let newCards: Card[] = [];

        if (mode === 'Preflop') {
            for (let i = 0; i < 2; i++) {
                newCards.push(generateUniqueRandomCard(cards));
            }
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

    return (
        <div className='cardGenerator'>
            <button
                className="generate-button"
                onClick={generateCards}>
                Generate Cards:
            </button>

            <div className='cardContainer'>
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

            <div className="button-container">
                <button className="generate-button raiseButton">Raise</button>
                <button className="generate-button callButton">Call</button>
                <button className="generate-button foldButton">Fold</button>
            </div>
        </div>
    );
}

export default CardGenerator;
