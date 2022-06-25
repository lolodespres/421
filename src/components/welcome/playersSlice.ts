import { createSlice } from "@reduxjs/toolkit";

const initialState: IPlayers = {
  p1: { name: "", avatarPath: "" },
  p2: { name: "", avatarPath: "" },
};
export interface IPlayer {
  [key: string]: string | number[];
  name: string;
  avatarPath: string;
}
export interface IPlayers {
  [key: string]: IPlayer;
  p1: IPlayer;
  p2: IPlayer;
}
export const playersSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    setPlayer: (state: IPlayers, pinfo: { payload: { [key: string]: IPlayer }; type: string }) => {
      return { ...state, ...pinfo.payload };
    },
      setPlayers: (state: IPlayers, pinfo: { payload: IPlayers; type: string }) => {
      return  { ...pinfo.payload };
    },
    reset: (state: IPlayers) => {
      state = initialState;
    },
  },
});

export const { setPlayer, setPlayers, reset } = playersSlice.actions;

export default playersSlice.reducer;

export function setplayers(playersTest: IPlayers): any {
  throw new Error("Function not implemented.");
}
