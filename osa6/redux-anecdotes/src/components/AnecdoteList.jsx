import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
const anecdotes = useSelector(({anecdotes, filter}) => {
  if (filter === '') {
    return anecdotes
  }
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
})

  const voteOrder = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
      {voteOrder.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
    )
}

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    }

    return (
    <div>
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
    </div>
    )
}

export default AnecdoteList