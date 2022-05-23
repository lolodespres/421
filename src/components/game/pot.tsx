import * as React from 'react';
import { useState } from 'react';
import store from '../../store';
import TokenCanvas from './TokenCanvas';

export interface IPropsPlayerBoxGame {
    numberPlayer: number;
    pathAvatar: string;
    name: string;

}
function createPot() {
    let tokens = [];
    let currentToken = 1;
    while(currentToken <= 21) {
        tokens.push(<TokenCanvas key={`pot${currentToken}`} className={`token-pot token`} width={20} height={20} draw={true} id={'token-pot'+currentToken}/>);
        currentToken++;
    }
    return tokens;
}
export default function PlayerBoxGame(props: IPropsPlayerBoxGame) {
    const [playerToken, setPlayerToken] = useState(createTokens(props.numberPlayer));

    return (
        <div id={`player${props.numberPlayer}` }className="player-board">
            <h2 className="container" id={`name${props.numberPlayer}`}>{props.name}</h2>
            <img className="container avatar" src={props.pathAvatar ? props.pathAvatar : "images/avatars/av1.png"} id={`avatar${props.numberPlayer}`} alt="avatar" />
            <div id={`box-token${props.numberPlayer}`} className="tokens-box container">
                {playerToken.map((token) => {
                    return token;
                })}
            </div>
        </div>);
}