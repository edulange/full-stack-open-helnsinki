import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification); // Replace 'notification' with the actual key in your Redux store

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...
    </div>
  )
}

export default Notification
