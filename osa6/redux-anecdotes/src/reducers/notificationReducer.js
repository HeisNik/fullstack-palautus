import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      makeNotification(state, action) {
        return action.payload
      },
      clearNotification(state, action) {
        return action.payload
      }
    },
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(makeNotification(message))
    time = 1000 * time
    setTimeout(() => {
      dispatch(clearNotification(''))
      }, time)
    }
} 

export const {makeNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer

