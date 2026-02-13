import { configureStore } from '@reduxjs/toolkit'
import nftReducer from './nftSlice'

export const store = configureStore({
  reducer: {
    nfts: nftReducer,
  },
})

// Типы для использования в хуках и по всему приложению
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

