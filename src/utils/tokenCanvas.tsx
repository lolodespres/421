
import React from 'react';
import TokenCanvas from "../components/game/TokenCanvas";
function createTokens(nbPlayer:number = 0) {
  let tokens = [];
  let currentToken = 1;
  while(currentToken <= 21) {
      tokens.push(<TokenCanvas key={`${nbPlayer}${currentToken}`} id={`tp${nbPlayer}-1`} className={`token-p${nbPlayer} token`} width={20} height={20} draw={false}/>);
      currentToken++;
  }
  return tokens;
}
///////// CANVAS UTILS
const dotColor = "#ffff";
const dots = [];
const size = 20;

function removeToken(tokenEl: HTMLCanvasElement) {
  tokenEl.width = tokenEl.width; // hack to clean canvas
}
function drawToken(token: HTMLCanvasElement | null) {
  if (token?.getContext) {
    const ctx: CanvasRenderingContext2D = token.getContext("2d") as CanvasRenderingContext2D;
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

export { drawToken, removeToken };

