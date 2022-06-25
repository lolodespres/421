import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PlayerBoxGame from "../components/game/PlayerBoxGame";
import store from "../store";
import "../styles/game.css";
import PotBoxGame from "../components/game/pot";
import DicesBoxPlayer from "../components/game/Dices";
import * as dicesActions from "../components/game/dicesSlice";
import * as playersActions from "../components/welcome/playersSlice";
import { useDispatch } from "react-redux";
import Scene from "../components/game/Scene";
import { IPlayer, IPlayers } from "../components/welcome/playersSlice";
export interface IPropsGame421 {}
const Game421 = (props: IPropsGame421) => {
  const dicesBoardValues = store.getState().dices.board;
  const [players, setplayers] = useState(store.getState().players);
  // const [players.p1, setp1] = useState(store.getState().players.players.p1);
  // const [p2, setp2] = useState(store.getState().players.p2);
  const [dices, setDices] = useState(store.getState().dices);
  // const [dicesBoard, setDicesBoard] = useState(dicesBoardValues);
  // const [dicesP1, setDicesP1] = useState([]);
  // const [dicesP2, setDicesP2] = useState([]);
  const [round, setRound] = useState("charge");
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(0);
  const [isPlaying, setIsPlaying] = useState("p1");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDevPlayers = async () => {
        //for dev test players
        const playersTestCall = await fetch("http://localhost:8080/dev/players");
        const playersTest: IPlayers = await playersTestCall.json();
        console.log(playersTest);
        dispatch(playersActions.setPlayers(playersTest as IPlayers));
        setplayers(playersTest as IPlayers);
    }
    try {
          if (players.p1.name === "") {
        fetchDevPlayers()
    }
      } catch (error) {
        console.log(error);
      }
    }, []);

  const rollDices = () => {
    dispatch(dicesActions.roll());
    const newDicesBoardValues = store.getState().dices.board;
    // setDicesBoard([...newDicesBoardValues]);
    round === "charge" && chargeRound(newDicesBoardValues);
  };

  const chargeRound = (dicesValue: number[]) => {
    const currentIsWaiting: string = isPlaying === "p1" ? "p2" : "p1";
    if (dices[currentIsWaiting].length === 0) {
      dispatch(dicesActions.setDicePlayer({ [isPlaying]: dicesValue }));
      setIsPlaying(currentIsWaiting);
    } else {
      // checkWinnerCharge(currentIsPlaying, currentIsWaiting);
    }

    (isPlaying === "p1" && setIsPlaying("p2")) || setIsPlaying("p1");
  };
  // const checkWinnerCharge = (isPlaying, isWaiting) => {
  //     let loser, winner;

  // }
  return (
    <>
      <Header view="game"></Header>
      <div id="head-game" className="container">
        <button id="validate-shot">garder le coup</button>
        <h2 id="game-round">{round}</h2>
        <button id="auto-charge">Charge auto</button>
        <button id="roll-dices" onClick={(e) => rollDices()}>
          Jeter
        </button>
      </div>
      <main className="main-container container">
        <PlayerBoxGame
          name={players.p1.name}
          numberPlayer={1}
          pathAvatar={players.p1.avatarPath}
        ></PlayerBoxGame>
        <DicesBoxPlayer nbPlayer={1} />
        <div className="gameboard">
          <PotBoxGame />
          <div id="dice-box-board">
            <Scene numberScene={1} draw={dices.board[0] !== 0} value={dices.board[0]} />
            <Scene numberScene={2} draw={dices.board[1] !== 0} value={dices.board[1]} />
            <Scene numberScene={3} draw={dices.board[2] !== 0} value={dices.board[2]} />
          </div>
        </div>
        <DicesBoxPlayer nbPlayer={2} />
        <PlayerBoxGame name={players.p2.name} numberPlayer={2} pathAvatar={players.p2.avatarPath} />
      </main>
      <footer>
        <div id="dialog-box" className="container">
          Durant la charge les joueur lance les dés chacun leur tour le gagnant recommence
        </div>
        <div id="score" className="container"></div>
      </footer>
    </>
  );
};
export default Game421;
