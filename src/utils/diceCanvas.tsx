/**
 *
 * @author: lotiko
 * @date:  04/2021
 *
 * @summary: dice canvas uitils
 */
///////// CANVAS UTILS
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TObjectKeyStringValueNumber } from "../types/global"
export interface IDiceProps {
  id: string;
  draw: boolean;
  // type: string;
  // index: number;
  value: number;
}
export function DiceCanvas(props: IDiceProps) {
  const canvasRef = useRef(null)
  const [value, setvalue] = useState(props.value);
  
  useEffect(() => {
    if(props.value !== value) setvalue(props.value);
    else {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (canvas && props.draw === true) {
        drawDice(canvas as HTMLCanvasElement, value);
      }
    }
  });
  return (
    <canvas ref={canvasRef} className="dices" id={props.id} width="34" height="34"></canvas>
  );
}
type TRoundRectArgs = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  fill: boolean;
  stroke: boolean;
}

/// Thanks to Tamas Berki and its code pen https://codepen.io/dzsobacsi/pen/pjxEOK/
/// that inspired me
const dotColor = "#ffff";
const dots: TObjectKeyStringValueNumber[] = [];
const size = 35;
//define dot locations
const padding = 0.25;
let x, y;
x = padding * size;
y = padding * size;
dots.push({ x: x, y: y });
y = size * 0.5;
dots.push({ x: x, y: y });
y = size * (1 - padding);
dots.push({ x: x, y: y });
x = size * 0.5;
y = size * 0.5;
dots.push({ x: x, y: y });
x = size * (1 - padding);
y = padding * size;
dots.push({ x: x, y: y });
y = size * 0.5;
dots.push({ x: x, y: y });
y = size * (1 - padding);
dots.push({ x: x, y: y });
function removeDice(diceEl: HTMLCanvasElement) {
  diceEl.width = diceEl.width; // hack to clean canvas
}
function drawDice(diceEl: HTMLCanvasElement, value: number): void {
  console.log("IN DRAW")
  if (diceEl.getContext) {
    const ctx = diceEl.getContext("2d") as CanvasRenderingContext2D;
    diceEl.width = diceEl.width; // hack to clean canvas
    if (value === 0) {
      diceEl.hidden = true;
      return;
    } else {
      diceEl.hidden = false;
    }
    let dotsToDraw: number[] = [];
    if (value == 1) dotsToDraw = [3];
    else if (value == 2) dotsToDraw = [0, 6];
    else if (value == 3) dotsToDraw = [0, 3, 6];
    else if (value == 4) dotsToDraw = [0, 2, 4, 6];
    else if (value == 5) dotsToDraw = [0, 2, 3, 4, 6];
    else if (value == 6) dotsToDraw = [0, 1, 2, 4, 5, 6];
    else console.log("Dice value shall be between 1 and 6");
    const roundRectArgs: TRoundRectArgs = {
      ctx: ctx,
      x: 0,
      y: 0,
      width: size,
      height: size,
      radius: 8,
      fill: true,
      stroke: true
    }
    roundRect(roundRectArgs);
    for (let i = 0; i < dotsToDraw.length; i++) {
      ctx.fillStyle = dotColor;
      ctx.strokeStyle = dotColor;
      ctx.save();
      ctx.beginPath();
      const j = dotsToDraw[i];
      ctx.arc(dots[j].x, dots[j].y, size * 0.07, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }
}

// http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(args: TRoundRectArgs/* ctx, x, y, width, height, radius, fill, stroke*/) {
  let radiusObj: { [key: string]: number } = {};
  if (typeof args.stroke == "undefined") {
    args.stroke = true;
  }
  if (typeof args.radius === "undefined") {
    args.radius = 5;
  }
  if (typeof args.radius === "number") {
    radiusObj = { tl: args.radius, tr: args.radius, br: args.radius, bl: args.radius };
  } else {
    const defaultRadius: { [key: string]: number } = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (const side in defaultRadius) {
      if (defaultRadius.hasOwnProperty(side)) {
        radiusObj[side] = radiusObj[side] || defaultRadius[side];
      }
    }
  }
  args.ctx.beginPath();
  args.ctx.moveTo(args.x + radiusObj.tl, args.y);
  args.ctx.lineTo(args.x + args.width - radiusObj.tr, args.y);
  args.ctx.quadraticCurveTo(args.x + args.width, args.y, args.x + args.width, args.y + radiusObj.tr);
  args.ctx.lineTo(args.x + args.width, args.y + args.height - radiusObj.br);
  args.ctx.quadraticCurveTo(args.x + args.width, args.y + args.height, args.x + args.width - radiusObj.br, args.y + args.height);
  args.ctx.lineTo(args.x + radiusObj.bl, args.y + args.height);
  args.ctx.quadraticCurveTo(args.x, args.y + args.height, args.x, args.y + args.height - radiusObj.bl);
  args.ctx.lineTo(args.x, args.y + radiusObj.tl);
  args.ctx.quadraticCurveTo(args.x, args.y, args.x + radiusObj.tl, args.y);
  args.ctx.closePath();
  if (args.fill) {
    args.ctx.fill();
  }
  if (args.stroke) {
    args.ctx.stroke();
  }
}

// export { drawDice, removeDice };

