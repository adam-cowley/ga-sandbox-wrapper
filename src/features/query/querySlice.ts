import { createSlice, Middleware, nanoid } from '@reduxjs/toolkit'
import { Result } from 'neo4j-driver';
import { RootState } from '../../store';

export type Query = { id: string, query: string, loading: boolean, error?: Error, result?: Result }
export type QueryState = { queries: Query[] };
export const EDITOR_PERSISTED_KEYS = ['cmdHistory'];

const initialState: QueryState = {
  queries: [],
}

// const loggerMiddleware: Middleware<{}, RootState> = store => next => action => {
//   if (action)

//   fetch({
//     method: 'POST',
//     url: '/',
//     body: {

//     }
//   })


//   return next(action)
// }

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    addQuery(state, action) {
      state.queries.unshift({
        id: nanoid(),
        query: action.payload.query,
        loading: true,
      })
    },
    removeQuery(state, action) {
      const { id } = action.payload
      const index = state.queries.findIndex(row => row.id === id)

      if ( index > -1 ) {
        state.queries.splice(index, 1)
      }
    }
  },

})

export const { addQuery, removeQuery } = querySlice.actions
export default querySlice.reducer