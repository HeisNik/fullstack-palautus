import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotiFicationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({type: 'SETNOTIFICATION', payload:`You created anecdote '${anecdote.content}'`})
      setTimeout(() => {
        dispatch({type: 'SETTONULL'})
      }, 5000)
    },
    onError: ({response}) => {
      dispatch({type: 'SETNOTIFICATION', payload:`${response.data.error}`})
      setTimeout(() => {
        dispatch({type: 'SETTONULL'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
