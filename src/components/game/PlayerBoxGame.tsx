import * as React from 'react';
import { useState } from 'react';
import TokenCanvas from '../../utils/tokenCanvas';

export interface IPropsPlayerBoxGame {
    numberPlayer: number;
    pathAvatar: string;
    name: string;

}
function createTokens(nbPlayer:number) {
    let tokens = [];
    let currentToken = 1;
    while(currentToken <= 21) {
        tokens.push(<TokenCanvas key={`${nbPlayer}${currentToken}`} id={`tp${nbPlayer}-1`} className={`token-p${nbPlayer} token`} width={20} height={20} draw={false}/>);
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