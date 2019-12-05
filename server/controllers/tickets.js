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

const postTicketData = (req, res, db) => {
  const { title, category, ticketdetails, department, email } = req.body
  const added = new Date()
  db('tickets').insert({title, category, ticketdetails, department, email, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTicketData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body
  db('tickets').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTicketData = (req, res, db) => {
  const { id } = req.body
  db('tickets').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getTicketData,
  postTicketData,
  putTicketData,
  deleteTicketData
}