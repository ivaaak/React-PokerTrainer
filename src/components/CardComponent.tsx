import './CardComponent.css'

type Card = {
    suit: string;
    rank: string;
};

export const CardComponent: React.FC<{ card: Card; classNameProp?: string }> = ({ card, classNameProp }) => {
    return (
        <div
            className={`poker poker-${card.suit}${card.rank} ${classNameProp}`}
        />
    );
};

export default CardComponent;
