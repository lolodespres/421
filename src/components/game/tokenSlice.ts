import { createSlice } from '@reduxjs/toolkit'

const initialState: ITokens = {
    p1: 0,
    p2: 0,
    pot: 21
};
export interface ITokens {
    [key: string]: number;
    p1: number;
    p2: number;
    pot: number
}
export type TTokenMove = {
    player: number;
    nbTokens: number;

}
export const tokenSlice = createSlice({
    name: 'tokens',
    initialState: initialState,
    reducers: {
        addTokenFromPot: (state: ITokens, pinfo: { payload: TTokenMove, type: string; }) => {
            state[`p${pinfo.payload.player}`] += pinfo.payload.nbTokens;
            state.pot <= pinfo.payload.nbTokens ? state.pot = 0 : state.pot -= pinfo.payload.nbTokens;
        },
        winToken: (state: ITokens, pinfo: { payload: TTokenMove, type: string }) => {
            let winner = pinfo.payload.player === 1 ? "p1" : "p2";
            let loser = pinfo.payload.player === 1 ? "p2" : "p1";
            state[winner] += pinfo.payload.nbTokens;
            state[loser] -= pinfo.payload.nbTokens;
        }
    }
})

export const { addTokenFromPot, winToken } = tokenSlice.actions

export default tokenSlice.reducer
