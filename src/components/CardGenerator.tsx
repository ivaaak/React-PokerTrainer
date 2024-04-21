import { useState } from 'react';
import CardComponent from './CardComponent';

import './CardGenerator.css'

type Card = {
    suit: string;
    rank: string;
};

export const CardGenerator = () => {
    const [cards, setCards] = useState<Card[]>([]);

    const generateCards = () => {
        const newCards = [getRandomCard(), getRandomCard()];
        setCards(newCards);
    };

    const getRandomCard = () => {
        const suits = ['h', 'd', 'c', 's'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];

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
                {cards.map((card, index) => (
                    <CardComponent key={index} card={card} />
                ))}
            </div>

            <div className="button-container">
                <button className="generate-button">Raise</button>
                <button className="generate-button">Call</button>
                <button className="generate-button">Fold</button>
            </div>
        </div>
    );
}

export default CardGenerator;
