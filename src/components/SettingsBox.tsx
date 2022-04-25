import * as React from 'react';
import { useState } from 'react';


const avatarsName: { [man: string]: string[]; women: string[] } = {
    man: ["av1", "av2", "av3", "av4"],
    women: ["av5", "av6", "av7", "av8"]
}
// INTERFACES
export interface ISettingsboxProps {
    nbPlayer: number;
    setPlayer: Function;
}
export interface IPlayerBoxProps {
    nbPlayer: number;
    nameAvatar: string;
}
export interface IAvatarsBoxProps {
    type: string;
    setAvatar: Function;
}

// COMPONENT
export default function Settingsbox(props: ISettingsboxProps) {
    const [currentAvatar, setcurrentAvatar] = useState("");
    const handleChangeAvatar = (nameAvatar:string) => {
        setcurrentAvatar(nameAvatar);
    }
    return (
        <main className="container">
            <PlayerBox nbPlayer={props.nbPlayer} nameAvatar={currentAvatar}/>
            <div id="avatars-box">
                <AvatarsBox type="man" setAvatar={handleChangeAvatar}/>
                <AvatarsBox type="women" setAvatar={handleChangeAvatar}/>
            </div>
        </main>
    );
}


function PlayerBox(props: IPlayerBoxProps) {
    const [name, setName] = useState("");
    const handleChangeName = (name:string) => {
        setName(name);
    }
    return (
        <div id="player-box">
            <h2>{`Joueur ${props.nbPlayer}`}</h2>
            <label>Nom (1 à 8 lettres):</label>
            <input type="text" id="name" value={name} name="name" minLength={1} maxLength={8} size={9} onChange={(e) => handleChangeName(e.target.value)}/>
            <div id="avatar-player">
                {props.nameAvatar !== "" && <img src={`images/avatars/${props.nameAvatar}.png`} alt="avatar" className={`avatar-item ${props.nameAvatar}`} />}
            </div>
            <button id="start">{props.nbPlayer === 1 ? "Valider" : "start"}</button>
        </div>
    );
}
function AvatarsBox(props: IAvatarsBoxProps) {
    return (
        <div className="avatars">
            {avatarsName[props.type].map((nameAvatar: string, index: number) => {
                return <img key={index} src={`images/avatars/${nameAvatar}.png`} alt="avatar" className={`avatar-item ${nameAvatar}`} onClick={() => props.setAvatar(nameAvatar)}/>
            })}
        </div>
    );
}
