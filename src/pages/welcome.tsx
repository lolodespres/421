import * as React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Settingsbox from '../components/SettingsBox';
import '../styles/welcome.css';
export interface IWelcomeProps {

}

export default function Welcome(props: IWelcomeProps) {
    const [player, setplayer] = useState(1);
    return (
        <>
            <Header view="set" />
            <Settingsbox nbPlayer={player}/>
        </>
    );
}
