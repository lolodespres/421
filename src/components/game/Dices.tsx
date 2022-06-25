import React, { useEffect, useRef, useState } from 'react';
import { DiceCanvas } from '../../utils/diceCanvas';
import store from '../../store';

export interface IDicesBoxPlayerProps {
    nbPlayer: number;
}
export default function DicesBoxPlayer(props: IDicesBoxPlayerProps) {
    const [dices, setDices] = useState(createDices());
    function createDices() {
        let dices: JSX.Element[] = [];
        let idx = 0;
        while (idx < 3) {
            dices.push(<DiceCanvas id={`d1-p${props.nbPlayer}`} draw={true} key={idx} value={store.getState().dices[`p${props.nbPlayer}`][idx]} />)
            idx++;
        }
        return dices;
    }
    // useEffect(() => {
    //     const dicesState = store.getState().dices;

    // }, []);
    return (
        <div id={`dice-box-${props.nbPlayer}`} className="dice-box container">
            {dices.map(((diceElement) => { return diceElement; }))}
        </div>
    );
}