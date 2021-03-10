/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process of 421 game
 */
import { Player } from "../player.js";
import { Dice } from "../dice.js";
///// PATH 2D
const diceOne = new Path2D("M25 45 v-15 M20 35 L25 30 M30 35 L25 30"); // arrow up
//////// CONST and LET
// take players info in sessionStorage and create players
const player1Store = JSON.parse(window.sessionStorage.getItem("player1Info"));
const player2Store = JSON.parse(window.sessionStorage.getItem("player2Info"));
const playersTab = [
  new Player(1, player1Store.name, player1Store.avatarPath),
  new Player(2, player2Store.name, player2Store.avatarPath),
];
const dicesBoard = { d1: new Dice("d1-board"), d2: new Dice("d2-board"), d3: new Dice("d3-board") };
const dicesPlayer1 = { d1p1: new Dice("d1-p1"), d3p1: new Dice("d2-p1"), d3p1: new Dice("d3-p1") };
const dicesPlayer2 = { d1p2: new Dice("d1-p2"), d3p2: new Dice("d1-p2"), d3p2: new Dice("d1-p2") };
console.log(dicesBoard);
const rollDicesBtn = document.getElementById("roll-dices");
const messageBox = document.getElementById("dialog-box");

/////////// FUNCTION

function insertPlayers() {
  for (const player of playersTab) {
    player.elements.title.textContent = player.name;
    player.elements.name.textContent = player.name;
    player.elements.avatar.setAttribute("src", player.avatar);
  }
  drawDicesBoard(dicesBoard);
}
function drawDicesBoard(dicesBoardObj) {
  for (const diceKey in dicesBoardObj) {
    if (Object.hasOwnProperty.call(dicesBoardObj, diceKey)) {
      const element = dicesBoardObj[diceKey];
      draw(element);
    }
  }
}
function rollDice() {
  for (const diceKey in dicesBoard) {
    if (Object.hasOwnProperty.call(dicesBoard, diceKey)) {
      const element = dicesBoard[diceKey];
      element.setRandomDiceValue();
    }
  }
  drawDicesBoard(dicesBoard);
}
///////// EVENTS
rollDicesBtn.addEventListener("click", function (ev) {
  rollDice();
});

///////// CANVAS UTILS
/// Thanks to Tamas Berki and its code pen https://codepen.io/dzsobacsi/pen/pjxEOK/
/// that inspired me
const dotColor = "#ffff";
const dots = [];
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
console.log(dots);
function draw(diceObj) {
  let value = diceObj.val;
  let dice = diceObj.elementHtml;
  if (dice.getContext) {
    const ctx = dice.getContext("2d");
    dice.width = dice.width; // hack to clean canvas
    let dotsToDraw;
    if (value == 1) dotsToDraw = [3];
    else if (value == 2) dotsToDraw = [0, 6];
    else if (value == 3) dotsToDraw = [0, 3, 6];
    else if (value == 4) dotsToDraw = [0, 2, 4, 6];
    else if (value == 5) dotsToDraw = [0, 2, 3, 4, 6];
    else if (value == 6) dotsToDraw = [0, 1, 2, 4, 5, 6];
    else console.log("Dice value shall be between 1 and 6");
    roundRect(ctx, 0, 0, size, size, 8, true);
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
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (const side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

///////// PROCESS
insertPlayers();
