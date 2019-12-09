const uuidv4 = require('uuid/v4')

const createUser = ({name = ""} = {}) => (
  {
    id: uuidv4(),
    name
  }
)

const createMessage = ({message ="", sender=""} = {}) => (
  {
    id: uuidv4(),
    time: new Date(),
    message,
    sender
  }
)

const createChat = ({messages:[], name="Tick Triage", users:[]} = {}) => (
  {
    id: uuidv4(),
    name,
    messages,
    users,
    typingUsers:[]
  }
)

module.exports = {
  createMessage,
  createChat,
  createUser
}