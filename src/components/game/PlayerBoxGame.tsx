import * as React from 'react';
import { useState } from 'react';
import store from '../../store';
import TokenCanvas from './TokenCanvas';

export interface IPropsPlayerBoxGame {
    numberPlayer: number;
    pathAvatar: string;
    name: string;

}
function createTokens(nbPlayer:number) {
    let tokens = [];
    let currentToken = 1;
    while(currentToken <= 21) {
        tokens.push(<TokenCanvas key={`${nbPlayer}${currentToken}`} id={`tp${nbPlayer}-1`} className={`token-p${nbPlayer} token`} width={20} height={20}/>);
        currentToken++;
    }
    return tokens;
}
export default function PlayerBoxGame(props: IPropsPlayerBoxGame) {
    const [playerToken, setPlayerToken] = useState(createTokens(props.numberPlayer));
    return (
        <div id={`player${props.numberPlayer}` }className="player-board">
            <h2 className="container" id={`name${props.numberPlayer}`}>{props.name}</h2>
            <img className="container" src={props.pathAvatar} id={`avatar${props.numberPlayer}`} alt="avatar" />
            <div id={`box-token${props.numberPlayer}`} className="tokens-box container">
                {playerToken.map((token) => {
                    return token;
                })}
                {/* <canvas id={`tp${props.numberPlayer}-1`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-2`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-3`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-4`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-5`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-6`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-7`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-8`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-9`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-10`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-11`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-12`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-13`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-14`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-15`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-16`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-17`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-18`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-19`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-20`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas>
                <canvas id={`tp${props.numberPlayer}-21`} className={`token-p${props.numberPlayer} token`} width="20" height="20"></canvas> */}
            </div>
        </div>);
}