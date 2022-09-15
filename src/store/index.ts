import { combineReducers, configureStore } from '@reduxjs/toolkit'
import query from '../features/query/querySlice'


const rootReducer = combineReducers({ query });

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
})
