const postDemoChatMessage = (postRecord, db) => {
  const { author, ticketid, message } = postRecord
  const sentTime = new Date()
  db('chats').insert({author, time:sentTime, ticketid, message})
    // .returning('*')
    // .then(console.log)
    //   res.json(item)
    // })
    .catch(err => console.log('eror in chat chatdb: ', err))
}

module.exports = {
  postDemoChatMessage
}