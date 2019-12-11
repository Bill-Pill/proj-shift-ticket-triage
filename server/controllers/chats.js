const postDemoChatMessage = (postRecord, db) => {
  const { author, ticketid, message } = postRecord
  const sentTime = new Date()
  console.log(postRecord, db)
  db('chats').insert({author, sentTime, ticketid, message});
    // .returning('*')
    // .then(item => {
    //   res.json(item)
    // })
    // .catch(err => res.status(400).json({dbError: 'error in chat db: ', err}))
}

module.exports = {
  postDemoChatMessage
}