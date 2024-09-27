import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return (
      <div>
      </div>
    )
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>

      {notification}
    </div>
  )
}

export default Notification