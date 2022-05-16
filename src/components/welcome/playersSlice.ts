import { createSlice } from '@reduxjs/toolkit'

const initialState: IPlayers = {
    p1: { name: "", avatarPath: "" },
    p2: { name: "", avatarPath: "" }
};
export interface IPlayer {
    name: string;
    avatarPath: string;
}
export interface IPlayers {
    p1: IPlayer;
    p2: IPlayer;
}
export const playersSlice = createSlice({
    name: 'players',
    initialState: initialState,
    reducers: {
        setPlayer: (state: IPlayers, pinfo: { payload: { [key: string]: IPlayer }; type: string; }) => {
            return { ...state, ...pinfo.payload };
        },
        reset: (state: IPlayers) => {
            state = initialState;
        }
    }
})

export const { setPlayer, reset } = playersSlice.actions

export default playersSlice.reducer