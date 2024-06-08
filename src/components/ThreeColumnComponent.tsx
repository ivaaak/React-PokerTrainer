import { useState } from 'react';
import HintModal from './HintModal';
import './ThreeColumnComponents.css'
import CardGenerator from './CardGenerator';

export const ThreeColumnComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<Mode>('Preflop');
    const [playStyle, setPlayStyle] = useState<PlayStyle>('Tight Passive');

    const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMode(event.target.value as Mode);
    };

    const handlePlayStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPlayStyle(event.target.value as PlayStyle);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className="row">
                <div className="column TrainingOptions">
                    <h3>Play Mode:
                        <select id="modeSelect" value={mode} onChange={handleModeChange}>
                            <option value="Preflop">Preflop: 2 cards</option>
                            <option value="Flop">Flop: 2 + 3 cards</option>
                            <option value="River">River: 2 + 4 cards</option>
                            <option value="Turn">Turn: 2 + 5 cards</option>
                        </select>
                    </h3>
                    <img src="https://images.squarespace-cdn.com/content/v1/58a75073e6f2e1c1d5b36630/1488404909857-HF7OGZY7J36V9TTPWLCN/DS.png" alt="DS.png" />
                    <p>The order in which cards are dealt is very specific and never changes. First, you are dealt two cards. Then come the flop, turn and river cards.</p>
                </div>

                <div className="column TrainingOptions">
                    <h3>Selected Playstyle:
                        <select id="playStyleSelect" value={playStyle} onChange={handlePlayStyleChange}>
                            <option value="Tight Passive">Tight Passive</option>
                            <option value="Loose Passive">Loose Passive</option>
                            <option value="Tight Aggressive (TAG)">Tight Aggressive (TAG)</option>
                            <option value="Loose Aggressive (LAG)">Loose Aggressive (LAG)</option>
                        </select>
                    </h3>
                    <img src="https://images.squarespace-cdn.com/content/v1/58a75073e6f2e1c1d5b36630/1488404924371-JUI7YA16MZFAMUFYPL4T/DS.png" alt="DS.png" />
                    <p>Each poker player can be broken down into two primary factors which will broadly define their playing style. They are as follows: tight vs. loose and passive vs. aggressive.</p>
                </div>

                <div className="column">
                    <h3>Specific Hint Charts</h3>
                    <br></br><br></br>
                    <img onClick={toggleModal} src="https://images.squarespace-cdn.com/content/v1/58a75073e6f2e1c1d5b36630/1488404934111-86PZV6FWC3IDNI37V94Z/DS.png" alt="DS.png" />
                    <p>Different charts based on the selected playstyle which show a ranking of all possible hand combinations - a good reference point for building intuition about different hands and positions.</p>
                </div>

                <HintModal isOpen={isModalOpen} onClose={toggleModal}>
                    <img src="https://pokertrainer.se/wp-content/uploads/2022/12/Call-BB-vs-BTN-768x682.png" alt="Chart Hints" />
                </HintModal>
            </div>
            <CardGenerator mode={mode} ></CardGenerator>
        </>

    );
};

export default ThreeColumnComponent;
