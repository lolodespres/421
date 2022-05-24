import * as React from 'react';
import store from '../store';

export interface IHeaderProps {
    view: string;
}

export default function Header(props: IHeaderProps) {
    const players = store.getState().players;
    if (props.view === "set") {
        return (
            <header className="container">
                <h2>Une partie de 421 ?</h2>
                <p>Ce 421 ce joue a deux: Veuillez choisir un nom et un avatar, pour chaque joueur</p>
            </header>);
    } else {
        return (
            <header>
                <nav className="container">
                    <h1>{players.p1.name}</h1>
                    <h1>vs</h1>
                    <h1>{players.p2.name}</h1>
                    <button id="set-players">Accueil</button>
                    <button id="restart">Recommencer</button>
                    <button id="btn-rules">Règles</button>
                </nav>
                <div id="head-game" className="container">
                    <button id="validate-shot">garder le coup</button>
                    <h2 id="game-round"></h2>
                    <button id="auto-charge">Charge auto</button>
                    <button id="roll-dices">Jeter</button>
                </div>
            </header>
        );
    }
}
