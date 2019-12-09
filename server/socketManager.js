// const io = require('./server.js').io

const { createUser, createMessage, createChat } = require('./client/src/Factories')
let connectedUsers = {}

module.exports = socket => {
  console.log('Socket ID is ', socket.id)

  socket.on("VERIFY_USER", (nickname, callback) => {
    if(isUser(connectedUsers, nickname)){
      callback({ isUser:true, user:null })
    } else {
      callback({isUser:false, user:createUser({name:nickname})})
    }
  })

  socket.on("USER_CONNECTED", (user) => {
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user;

    socket.emit("USER_CONNECTED", connectedUsers)
    console.log(connectedUsers)
  })


  addUser = (userList, user) => {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
  }
  removeUser = (userList, username)=> {
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
  }
  
  isUser = (userList, username) => {
    return username in userList
  }
}
