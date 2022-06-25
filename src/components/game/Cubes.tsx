import * as React from 'react';

export interface ICubeProps {
    nb: number;
}

export function Cube(props: ICubeProps) {
    return (
        <div id={`cube-d${props.nb}`} className="cube is-spinning">
            <div className="cube__face cube__face--front"></div>
            <div className="cube__face cube__face--back"></div>
            <div className="cube__face cube__face--right"></div>
            <div className="cube__face cube__face--left"></div>
            <div className="cube__face cube__face--top"></div>
            <div className="cube__face cube__face--bottom"></div>
        </div>
    );
}
