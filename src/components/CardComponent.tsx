import './CardComponent.css'

type Card = {
    suit: string;
    rank: string;
};

export const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <div
            className={`poker poker-${card.suit}${card.rank}`}
        />
    );
};

export default CardComponent;
