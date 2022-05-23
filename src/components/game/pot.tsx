import * as React from 'react';
import { useState } from 'react';
import store from '../../store';
import TokenCanvas from './TokenCanvas';

export interface IPropsPot {
    // numberPlayer: number;
    // pathAvatar: string;
    // name: string;

}
function createPot() {
    let tokens = [];
    let currentToken = 1;
    while (currentToken <= 21) {
        tokens.push(<TokenCanvas key={`pot${currentToken}`} className={`token-pot token`} width={20} height={20} draw={true} id={'token-pot' + currentToken} />);
        currentToken++;
    }
    return tokens;
}
export default function PotBoxGame(props: IPropsPot) {
    const [potToken, setPotToken] = useState(createPot());

    return (
        <div id="pot" className="container tokens-box">
            {potToken.map((token) => {
                return token;
            })}

        </div>);
}