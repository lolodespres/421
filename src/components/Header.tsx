import * as React from 'react';

export interface IHeaderProps {
    view: string;
}

export default function Header(props: IHeaderProps) {
    if (props.view === "set") {
        return (
        <header className="container">
            <h2>Une partie de 421 ?</h2>
            <p>Ce 421 ce joue a deux: Veuillez choisir un nom et un avatar, pour chaque joueur</p>
        </header>);
    } else {
        return (
            <header>
    
            </header>
        );
    }
}
