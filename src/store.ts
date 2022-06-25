import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './components/welcome/playersSlice'
import tokensReducer from "./components/game/tokenSlice"
import dicesReducer from "./components/game/dicesSlice"
const store =  configureStore({
  reducer: {
    players: playersReducer,
    tokens: tokensReducer,
    dices: dicesReducer
  }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;