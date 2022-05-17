import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

export interface IPropsTokenCanvas {
    id: string;
    className: string;
    width: number;
    height: number;

}
export default function TokenCanvas(props: IPropsTokenCanvas) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if(canvas) drawToken(canvas);
    }, [])

    return <canvas ref={canvasRef} {...props} />
}

///////// CANVAS UTILS
const dotColor = "#ffff";
const dots = [];
const size = 20;

function removeToken(tokenEl: HTMLCanvasElement) {
    tokenEl.width = tokenEl.width; // hack to clean canvas
}
function drawToken(token: HTMLCanvasElement) {
    const ctx = token.getContext("2d");
    if (ctx) {
        token.width = token.width; // hack to clean canvas
        ctx.beginPath();
        // ctx.arc(x, y, radius, startAngle, endAngle)
        ctx.arc(10, 10, 6, 0, Math.PI * 2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black"; // !
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(10, 10, 4, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "brown"; // !
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(10, 10, 3, 0, Math.PI * 2);
        ctx.fillStyle = "black"; // !
        ctx.fill();
        ctx.closePath();
    }
}
