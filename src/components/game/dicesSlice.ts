import { createSlice } from "@reduxjs/toolkit";
const diceVals = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
// const diceVals = [2, 1];
const powerByComboCombi = {
  124: 10,
  111: 7,
  116: 6.5,
  666: 6,
  115: 5.5,
  555: 5,
  114: 4.5,
  444: 4,
  113: 3.5,
  333: 3,
  112: 2.6,
  222: 2.5,
  456: 2.4,
  345: 2.3,
  234: 2.2,
  123: 2.1,
};
const messageCombi = {
  124: "421",
  111: "Mac 1",
  116: "Mac 6",
  666: "Brelan de 6",
  115: "Mac 5",
  555: "Brelan de 5",
  114: "Mac 4",
  444: "Brelan de 4",
  113: "Mac 3",
  333: "Brelan de trois",
  112: "Mac 2",
  222: "Brelan de 2",
  456: "Suite aux 6",
  345: "Suite aux 5",
  234: "Suite aux 4",
  123: "Suite aux 3",
};
const conboCombis = Object.keys(powerByComboCombi);
export interface IDices {
  [key: string]: number[];
  p1: number[];
  p2: number[];
  board: number[];
}
const initialState: IDices = {
  p1: [0, 0, 0],
  p2: [0, 0, 0],
  board: [0, 0, 0],
};
export const dicesSlice = createSlice({
  name: "tokens",
  initialState: initialState,
  reducers: {
    roll: (state: IDices) => {
      state.board = state.board.map(
        (oldVal) => diceVals[Math.floor(Math.random() * diceVals.length)]
      );
    },
    setDicePlayer: (
      state: IDices,
      dices: { payload: { [key: string]: number[] }; type: string }
    ) => {
      state = { ...state, ...dices.payload };
    },
  },
});

export const { roll, setDicePlayer } = dicesSlice.actions;

export default dicesSlice.reducer;
