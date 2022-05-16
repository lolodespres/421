import React from "react";
import { useState } from "react";
import { IPlayerBoxProps } from "./SettingsBox";

import { useSelector } from 'react-redux';
import store, { RootState } from "../../store";
import { useDispatch } from 'react-redux'
import { IPlayer, setPlayer } from "./playersSlice";
import { useNavigate } from "react-router-dom";




export const PlayerBox = (props: IPlayerBoxProps) => {
    const p1 = useSelector((state: RootState) => state.players.p1);
    const p2 = useSelector((state: RootState) => state.players.p2);
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [player, changePlayer] = useState(1);
    const handleChangeName = (name: string) => {
        setName(name);
    }
    const PlayerInStore = () => {
        if (name === "" || name.length > 8) {
            alert("Le nom du joueur doit contenir entre 1 et 8 lettres");
            return;
        }
        if (props.nameAvatar === "") {
            alert("Veuilez choisir un avatar en cliquant sur un des differants choix");
            return;
        }
        let playerInfo:{[key:string]:IPlayer} = {
            [`p${player}`]: {
                name: name,
                avatarPath: `images/avatars/${props.nameAvatar}.png`

            }
        };
        dispatch(setPlayer(playerInfo));
        if(player === 1) {
            changePlayer(2);
            setName("");
            props.resetAvatar("");
        } else {
            navigate('/421');
        }
    }
    return (
        <div id="player-box">
            <h2>{`Joueur ${player}`}</h2>
            <label>Nom (1 à 8 lettres):</label>
            <input type="text" id="name" name="name" value={name} minLength={1} maxLength={8} size={9} onChange={(e) => handleChangeName(e.target.value)} />
            <div id="avatar-player">
                {props.nameAvatar !== "" && <img src={`images/avatars/${props.nameAvatar}.png`} alt="avatar" className={`avatar-item ${props.nameAvatar}`} />}
            </div>
            <button id="start" onClick={() => PlayerInStore()}>{player === 1 ? "Valider" : "start"}</button>
        </div>
    );
}


