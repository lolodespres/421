import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './components/welcome/playersSlice'
import tokensReducer from "./components/game/gameSlice"
const store =  configureStore({
  reducer: {
    players: playersReducer,
    tokens: tokensReducer
  }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;