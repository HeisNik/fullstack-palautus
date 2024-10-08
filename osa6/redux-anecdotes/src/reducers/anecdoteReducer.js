import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/*const anecdoteOrder = (anecdotes) => {
  return anecdotes.sort((a1,a2) => (a1.votes < a2.votes) ? 1 : (a1.price > a2.price) ? -1 : 0)
}*/

/*const anecdoteOrder = (initialState) => {
  const votes = initialState.filter(anecdote => anecdote.votes)
  console.log('votes', votes)
}
anecdoteOrder()*/


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    likeAnecdote(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )     
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { likeAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
  const updatedAnecdote = await anecdoteService.updateVotes({...anecdote, votes: anecdote.votes + 1})
  dispatch(likeAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer