import * as React from 'react';
import { useState } from 'react';
import store from '../store';
import Rules from './Rules';
export interface IHeaderProps {
    view: string;
}

export default function Header(props: IHeaderProps) {
    const players = store.getState().players;
    const [rulesOpen, setRulesOpen] = useState(false);
    const toggleRules = () => {
        setRulesOpen(!rulesOpen);
    }
    if (props.view === "set") {
        return (
            <header className="container">
                <h2>Une partie de 421 ?</h2>
                <p>Ce 421 ce joue a deux: Veuillez choisir un nom et un avatar, pour chaque joueur</p>
            </header>);
    } else if (props.view === "game") {
        return (
            <>
                <header className="container">
                    <nav >
                        <h1>{players.p1.name}</h1>
                        <h1>vs</h1>
                        <h1>{players.p2.name}</h1>
                        <button id="set-players">Accueil</button>
                        <button id="restart">Recommencer</button>
                        <button id="btn-rules" onClick={() => toggleRules()}>Règles</button>
                    </nav>
                </header>
                {rulesOpen && <Rules closeBtn={toggleRules}/>}
            </>
        );
    } else {
        return <></>;
    }
}
