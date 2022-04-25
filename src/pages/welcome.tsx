import * as React from 'react';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Settingsbox from '../components/SettingsBox';
import '../styles/welcome.css';

interface IPlayer {
    name:string;
    avatar:string;
}
interface IPlayers {
    player1: IPlayer;
    player2: IPlayer;
}
const playersInfo:IPlayers = {
    player1: {
        name: "",
        avatar: ""
    },
    player2: {
        name: "",
        avatar: ""
    }
}
export interface IWelcomeProps {

}

export default function Welcome(props: IWelcomeProps) {
    const [player, setplayer] = useState(1);
    const [players, setplayers] = useState(playersInfo);
    const setPlayer = (nbPlayer: number, playerInfo: IPlayer) => {
        setplayers({ [`player${nbPlayer}`]: playerInfo, ...players })
    }
    return (
        <>
            <Header view="set" />
            <Settingsbox nbPlayer={player} setPlayer={setPlayer} />
            <Footer/>
        </>
    );
}
