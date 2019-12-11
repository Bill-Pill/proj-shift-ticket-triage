const getChatData = (req, res, db) => {
  db.select('*').from('chats')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error in chats: ', err}))
}

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
  postDemoChatMessage,
  getChatData
}