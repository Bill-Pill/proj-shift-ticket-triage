const getTicketData = (req, res, db) => {
  db.select('*').from('tickets')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getTicketDetails = (req, res, db, ticketid) => {
  db.select('*').from('tickets').where('ticketid', ticketid)
  .then(items => {
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTicketStatus = (req, res, db, ticketid) => {
  const newStatusCode = req.body.newStatusCode;
  const modified = new Date()
  db('tickets').where({'ticketid': ticketid})
    .update({'statuscode': newStatusCode, 'modified': modified})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTicketData = (req, res, db) => {
  const { title, category, ticketdetails, department, username } = req.body
  const added = new Date()
  const statuscode = 0;
  db('tickets').insert({title, category, ticketdetails, department, username, added, statuscode})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: err}))
}

const deleteTicketData = (req, res, db) => {
  const { id } = req.body
  db('tickets').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}


//
// Modified routes for demo use
//
const getDemoTicketData = (req, res, db, username) => {
  db.select('*').from('tickets').where('username', username)
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putDemoResponse = (ticketid, response, db) => {
  db('tickets').where({'ticketid': ticketid})
    .update({'demoresponse': response})
    .catch(err => console.log('error in demo response ', err))
}

module.exports = {
  getTicketData,
  getTicketDetails,
  postTicketData,
  putTicketStatus,
  deleteTicketData,
  getDemoTicketData,
  putDemoResponse
}