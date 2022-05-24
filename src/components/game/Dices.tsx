import React, { useEffect, useRef, useState } from 'react';
import { DiceCanvas } from '../../utils/diceCanvas';
// export interface IDiceProps {
//     id: string;
//     draw: boolean;
// }
export interface IDicesBoxPlayerProps {
    nbPlayer: number;
}

// export function Dice(props: IDiceProps) {
//     const canvasRef = useRef(null)
//     const [value, setvalue] = useState(1);
//     useEffect(() => {
//         const canvas: HTMLCanvasElement | null = canvasRef.current;
//         console.log(props.draw, canvas)
//         if (canvas && props.draw === true) drawDice(canvas as HTMLCanvasElement, value);
//     }, [])
//     return (
//         <canvas className="dices" id={props.id} width="34" height="34"></canvas>
//     );
// }


export default function DicesBoxPlayer(props: IDicesBoxPlayerProps) {
    const idsDice = [
        `d1-p${props.nbPlayer}`,
        `d2-p${props.nbPlayer}`,
        `d3-p${props.nbPlayer}`
    ];
    function createDices() {
        let dices: JSX.Element[] = [];
        idsDice.map((val, idx) => {
            dices.push(<DiceCanvas id={val} draw={true} key={idx} />)
        });
        console.log("IN DICE", dices)
        return dices;
    }
    const [dices, setDices] = useState(createDices());
    console.log("IN DICES BOX", props.nbPlayer)
    return (
        <div id={`dice-box-${props.nbPlayer}`} className="dice-box container">
            {dices.map(((diceElement) => { console.log(diceElement, "IN MAP"); return diceElement; }))}
            {/* <DiceCanvas id={idsDice[0]} draw={true}/> */}
        </div>
    );
}