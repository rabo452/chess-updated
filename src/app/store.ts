import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { chessSlice } from 'features/chess'
import { useDispatch, useSelector } from 'react-redux'
// ...

var rootReducer = combineReducers({
    chess: chessSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})

type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()