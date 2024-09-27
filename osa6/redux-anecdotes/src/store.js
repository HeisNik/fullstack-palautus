import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, {setAnecdotes} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'
import anecdotes from './services/anecdotes'

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  },
})
