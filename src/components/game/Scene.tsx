import * as React from 'react';
import { useEffect, useState } from 'react';
import store from '../../store';
import { DiceCanvas } from '../../utils/diceCanvas';
import { Cube } from './Cubes';
// import TokenCanvas from '../../utils/tokenCanvas';

export interface IPropsScene {
    numberScene: number;
    draw: boolean;
    value: number;
    // name: string;

}
export default function Scene(props: IPropsScene) {
    const [isRolling, setIsRolling] = useState(false);
    const [value, setValue] = useState(props.value);
    useEffect(() => {
        if (props.value !== 0 && !isRolling) {
            setIsRolling(true);
            setValue(props.value);
            setTimeout(() => {
                setIsRolling(false);
            }, 450 * props.numberScene);
        }
    }, [props]);
    return (
        <div className={`scene-d${props.numberScene} scene`}>
            {isRolling && <Cube nb={props.numberScene} />}
            {!isRolling && <DiceCanvas id="d1-board" draw={props.draw} value={value} />}
        </div>);
}