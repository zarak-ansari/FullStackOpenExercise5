const Notification = ({ message, color }) => {

    const styles = {
      color: color,
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
  
    if(message){
      return (
        <div style={styles}>
          {message}
        </div>
      )
    }
}

export default Notification
  