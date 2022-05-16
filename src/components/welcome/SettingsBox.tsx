import * as React from 'react';
import { useState } from 'react';
import AvatarsBox from './AvatarsBox';
import { PlayerBox } from './PlayerBox';



// INTERFACES
export interface ISettingsboxProps {}
export interface IPlayerBoxProps {
    nameAvatar: string;
    resetAvatar: Function;
}
export interface IAvatarsBoxProps {
    type: string;
    setAvatar: Function;
}

// COMPONENT
export default function Settingsbox(props: ISettingsboxProps) {
    const [currentAvatar, setcurrentAvatar] = useState("");
    const [error, setError] = useState(false);
    const handleChangeAvatar = (nameAvatar: string) => {
        setcurrentAvatar(nameAvatar);
    }
    return (
        <main className="container">
            <PlayerBox nameAvatar={currentAvatar} resetAvatar={setcurrentAvatar}/>
            <div id="avatars-box">
                <AvatarsBox type="man" setAvatar={handleChangeAvatar} />
                <AvatarsBox type="women" setAvatar={handleChangeAvatar} />
            </div>
        </main>
    );
}
