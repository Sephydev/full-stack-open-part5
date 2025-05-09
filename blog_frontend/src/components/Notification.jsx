const Notification = ({ message }) => {
  const messageStyle = {
    borderStyle: "solid",
    borderColor: message.isError ? "red" : "green",
    borderRadius: 5,
    backgroundColor: message.isError ? "lightgray" : "lightgreen",
    fontSize: 20,
    padding: 10,
    marginBottom: 20,
    color: message.isError ? "red" : "green"
  }

  if (message.text) {
    return (
      <p style={messageStyle}>{message.text}</p>
    )
  }

  return null
}

export default Notification