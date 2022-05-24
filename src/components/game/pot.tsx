import * as React from 'react';
import { useState } from 'react';
import store from '../../store';
import TokenCanvas from '../../utils/tokenCanvas';

export interface IPropsPot {
    // numberPlayer: number;
    // pathAvatar: string;
    // name: string;

}
export default function PotBoxGame(props: IPropsPot) {
    function createPot() {
        let tokens = [];
        let currentToken = 1;
        while (currentToken <= 21) {
            tokens.push(<TokenCanvas key={`pot${currentToken}`} className={`token-pot token`} width={20} height={20} draw={true} id={'token-pot' + currentToken} />);
            currentToken++;
        }
        return tokens;
    }
    const [potToken, setPotToken] = useState(createPot());
    // voir use effect et memo
    return (
        <div id="pot" className="container tokens-box">
            {potToken.map((token) => {
                return token;
            })}

        </div>);
}