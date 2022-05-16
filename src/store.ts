import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './components/welcome/playersSlice'

const store =  configureStore({
  reducer: {
    players: playersReducer
  }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;