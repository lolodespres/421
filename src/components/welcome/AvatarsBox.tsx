import * as React from 'react';
import { IAvatarsBoxProps } from './SettingsBox';


const avatarsName: { [man: string]: string[]; women: string[] } = {
    man: ["av1", "av2", "av3", "av4"],
    women: ["av5", "av6", "av7", "av8"]
}


export default function AvatarsBox(props: IAvatarsBoxProps) {
    return (
        <div className="avatars">
            {avatarsName[props.type].map((nameAvatar: string, index: number) => {
                return <img key={index} src={`images/avatars/${nameAvatar}.png`} alt="avatar" className={`avatar-item ${nameAvatar}`} onClick={() => props.setAvatar(nameAvatar)}/>
            })}
        </div>
    );
}