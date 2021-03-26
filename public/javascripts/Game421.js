import { Dices421 } from "./dice.js";
import { Player } from "./player.js";
import { Token } from "./token.js";
const log = [];
const gameRoundElement = document.getElementById("game-round");
const validateShot = document.getElementById("validate-shot");
const messageBox = document.getElementById("dialog-box");
// take players info in sessionStorage and create players
const player1Store = JSON.parse(window.sessionStorage.getItem("player1Info"));
const player2Store = JSON.parse(window.sessionStorage.getItem("player2Info"));
// take tokens canvas (board, player1, player2) and create object for each, draw token in board
const arrTokensBoard = [];
document.querySelectorAll(".token-board").forEach(insertTokenBoard);
const arrTokensP1 = [];
document.querySelectorAll(".token-p1").forEach((el) => insertTokenPlayer(el, 1));
const arrTokensP2 = [];
document.querySelectorAll(".token-p2").forEach((el) => insertTokenPlayer(el, 2));
const rollDicesScene = document.querySelectorAll("scene");
const cubes = document.querySelectorAll(".cube");
const originX = 0;
const originY = 0;
cubes.forEach((el) => {
  el.classList.add("is-spinning");
  el.hidden = true;
});
// cube.classList.add( 'is-backface-hidden');
rollDicesScene.forEach((el) => {
  el.style.perspectiveOrigin = originX + "% " + originY + "%";
  el.style.perspective = "500px";
});
function insertTokenBoard(element) {
  arrTokensBoard.push(new Token(element.id, element, true));
}

function insertTokenPlayer(element, idPlayer) {
  idPlayer === 1 && arrTokensP1.push(new Token(element.id, element, false));
  idPlayer === 2 && arrTokensP2.push(new Token(element.id, element, false));
}
class Game421 {
  constructor() {
    this.player1 = new Player(1, player1Store.name, player1Store.avatarPath);
    this.player2 = new Player(2, player2Store.name, player2Store.avatarPath);
    this.tokensBoardObj = arrTokensBoard;
    this.tokensP1Obj = arrTokensP1;
    this.tokensP2Obj = arrTokensP2;
    this.dices = new Dices421("d1-board", "d2-board", "d3-board");
    this.gameRound = "charge";
    this.powerTurn = 3;
  }
  start(restart) {
    if (restart) {
      window.location.reload();
      return;
    } //// TODO add more elegant option for restart
    this.player1.insert();
    this.player2.insert();
    this.player1.state = "play";
    // this.addEventOnDices();
  }
  getIsPlayingPlayer() {
    if (this.player1.state === "play") return this.player1;
    else return this.player2;
  }
  getIsWaitingPlayer() {
    if (this.player1.state === "play") return this.player2;
    else return this.player1;
  }
  addEventOnDices() {
    for (const keyDice in this.dices) {
      if (Object.hasOwnProperty.call(this.dices, keyDice)) {
        const dice = this.dices[keyDice];
        dice.elementHtml.addEventListener(
          "click",
          (ev) => dice.boardToAside(ev, this.getIsPlayingPlayer().id),
          {
            once: true,
          }
        );
      }
    }
  }
  roll() {
    // console.log(this.getIsPlayingPlayer().turn);
    let withTimeout = this.gameRound === "chargeAuto" ? false : true;
    console.log(cubes);
    let resultDice = this.dices.rollDices(withTimeout, cubes);
    if (resultDice) {
      if (this.gameRound === "charge") {
        setTimeout(() => this.chargeGameRound(), 1500); // timeout pour ne pas avoir les jetons distribuer avant la fin du lancer
      } else if (this.gameRound === "chargeAuto") {
        // no timeout for automatique gameround else conflict with timeout in rollDices methode of dices class
        this.chargeGameRound();
      } else {
        let currentPlayer = this.getIsPlayingPlayer();
        currentPlayer.turn++;
        if (currentPlayer.turn === this.powerTurn) {
          setTimeout(() => this.dechargeGameRound(), 4000);
        } else {
          if (currentPlayer.turn === this.powerTurn - 1) {
            gameRoundElement.textContent = `Derniére chance pour ${currentPlayer.name}`;
          } else {
            gameRoundElement.textContent = `À ${currentPlayer.name} jet restant ${
              this.powerTurn - currentPlayer.turn
            }`;
          }
        }
      }
    } else {
      return;
    }
  }
  chargeGameRound() {
    if (this.getIsPlayingPlayer().id === 1) {
      this.player1.combi = this.dices.getCombi();
      this.changeIsPlaying();
      return;
    } else {
      this.player2.combi = this.dices.getCombi();
      let resultCompare = this.dices.compareCombi(this.player1.combi, this.player2.combi);
      let arrTokensPlayerloser = this[`tokensP${resultCompare.loser}Obj`];
      let nbToken = resultCompare.power;
      log.push([resultCompare, this.player1.combi, this.player2.combi]);
      // onjoute les tokens au player perdant
      resultCompare.loser === 1
        ? (this.player1.tokens += nbToken)
        : (this.player2.tokens += nbToken);
      if (typeof arrTokensPlayerloser === "undefined") {
        // console.log("first else + if", this.player1.combi);
        //// TODO ici mettre logique message égalité
      } else {
        let loserPlayer = this[`player${resultCompare.loser}`];
        if (Token.tokenInPot < nbToken) nbToken = Token.tokenInPot;
        loserPlayer.giveToken(nbToken, arrTokensPlayerloser, this.tokensBoardObj);
        Token.tokenInPot -= nbToken;
      }
      if (Token.tokenInPot <= 0) return this.startDecharge(resultCompare.loser);
      this.changeIsPlaying();
    }
    return;
  }
  autoCharge() {
    this.gameRound = "chargeAuto";
    while (Token.tokenInPot > 0) {
      this.roll();
    }
  }
  startDecharge(loser) {
    this.gameRound = "decharge";
    this.dices.removeDices();
    this.addEventOnDices();
    this.removeCombiPlayers();
    if (loser === 2) {
      // le gagnant du dernier coup commence
      this.changeIsPlaying();
    }
    let currentPlayer = this.getIsPlayingPlayer();
    gameRoundElement.textContent = "Decharge!"; //// voir pour anim
    messageBox.textContent = `À ${currentPlayer.name} de jouer`;

    /// TODO les messages de transition + anim transitions decharge

    // activation du bouton garder le coup
    validateShot.hidden = false;
    validateShot.onclick = () => {
      let currentCombi = this.dices.getCombi();
      if (currentCombi === 0) {
        return;
      }
      this.getIsPlayingPlayer().combi = currentCombi;
      this.dechargeGameRound();
    };
  }

  dechargeGameRound(
    currentPlayer = this.getIsPlayingPlayer(),
    waitingPlayer = this.getIsWaitingPlayer()
  ) {
    // par default on ne reset pas les combi des joueur et on change le joueur qui joue
    let withResetCombi = false;
    let withChangeIsPlaying = currentPlayer.id;
    if (currentPlayer.combi === "") {
      // si le coup est le dernier possible pour le joueur (combi non set)
      // alors on set sa combi et on relance le process avec la combi du joueur courant sauvegarder pour comparer
      currentPlayer.combi = this.dices.getCombi();
      return this.dechargeGameRound(currentPlayer, waitingPlayer);
    } else {
      // si un seul joueur a jouer dans le tour on crée un message sinon le process de comparaison se lance
      if (waitingPlayer.combi === "") {
        this.dechargeAttack(currentPlayer, waitingPlayer);
      } else {
        // on compare les combinaisons
        let resultCompare = this.dices.compareCombi(this.player1.combi, this.player2.combi);
        let arrTokensPlayerloser =
          resultCompare.loser === 0 ? 0 : this[`tokensP${resultCompare.loser}Obj`];
        let arrTokensPlayerWinner = resultCompare.loser === 1 ? this.tokensP2Obj : this.tokensP1Obj;
        let nbToken = resultCompare.power;
        if (arrTokensPlayerloser === 0) {
          // si égalité juste remettre le turn des player a zéro
          //// TODO ici mettre logique message égalité
          console.log(arrTokensPlayerloser);
        } else {
          // sinon le gagnant donne les jetons en function de la force de sa combinaison a l'autre
          let loserPlayer = this[`player${resultCompare.loser}`];
          loserPlayer.giveToken(nbToken, arrTokensPlayerloser, arrTokensPlayerWinner);
          this.addRemovePlayerTokens(resultCompare.loser, nbToken);
          // le gagnant joue en premier le tour d'aprés
          if (loserPlayer.id !== currentPlayer.id) {
            withChangeIsPlaying = false;
            this.messageWhoPlay(currentPlayer, waitingPlayer, nbToken);
          } else {
            this.messageWhoPlay(waitingPlayer, currentPlayer, nbToken);
          }
          // on verifie si il y a un gagnant et appel gameEnd avec le bon paramétre
          if (this.player1.tokens >= 21) {
            return this.gameEnd(this.player2);
          }
          if (this.player1.tokens <= 0) {
            return this.gameEnd(this.player1);
          }
        }
        // aprés échange de jetons ou égalité
        // le powerTurn est remis a 3
        // les nb de tour des joueur également
        // et on reset les combi
        currentPlayer.turn = 0;
        waitingPlayer.turn = 0;
        this.powerTurn = 3;
        withResetCombi = true;
        gameRoundElement.textContent = `À ${waitingPlayer.name} jet restant ${
          this.powerTurn - waitingPlayer.turn
        }`;
      }
    }
    // prépare le prochain tour avec remise a zéro des combinaisons ou non
    // avec changement de joeur qui joue ou non, et les dés sont remis dans le board
    this.resetTurn(withResetCombi, withChangeIsPlaying);
    return;
  }
  messageWhoPlay(winner, loser, nbToken) {
    messageBox.textContent = `${winner.name} gagne et donne ${nbToken} jetons à ${loser.name}.
            ${winner.name} rejoue.`;
  }
  dechargeAttack(currentPlayer, waitingPlayer) {
    this.powerTurn = currentPlayer.turn;
    messageBox.textContent = `À ${waitingPlayer.name} de jouer\n Il doit faire mieux que ${currentPlayer.combi} en ${this.powerTurn}.`;
    currentPlayer.turn = 0;
    gameRoundElement.textContent = `${waitingPlayer.name} jet restant ${
      this.powerTurn - waitingPlayer.turn
    }`;
  }
  resetTurn(withCombiPlayer, withChangeIsPlaying) {
    withCombiPlayer && this.removeCombiPlayers();
    withChangeIsPlaying && this.changeIsPlaying();
    this.dices.removeDices();
    this.addEventOnDices();
  }
  gameEnd(winnerPlayer) {
    messageBox.textContent = `${winnerPlayer.name} gagne la partie!!!.`;
  }
  addRemovePlayerTokens(loser, nbToken) {
    /// TODO voir ici avec le board
    if (loser === 1) {
      this.player1.tokens += nbToken;
      this.player2.tokens -= nbToken;
    } else {
      this.player1.tokens -= nbToken;
      this.player2.tokens += nbToken;
    }
  }
  removeCombiPlayers() {
    this.player1.combi = "";
    this.player2.combi = "";
  }
  changeIsPlaying() {
    (this.player2.state === "play" && (this.player2.state = "wait")) ||
      (this.player2.state = "play");
    (this.player1.state === "play" && (this.player1.state = "wait")) ||
      (this.player1.state = "play");
  }
}

export { Game421 };
