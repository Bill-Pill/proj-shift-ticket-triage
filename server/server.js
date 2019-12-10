const http = require('http')
const express = require('express')
const SocketManager = require('./socketManager')

// use process.env variables to keep private variables,
require('dotenv').config()
const keys = require('./config/keys')

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests



// db Connection bases on prod or dev build
var db = require('knex')({
  client: 'pg',
  connection: keys.POSTGRES_CONNECTION_URI
});

// Controllers - aka, the db queries
const tickets = require('./controllers/tickets')

// App
const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/api/tickets', (req, res) => tickets.getTicketData(req, res, db))

app.get('/api/ticket/:ticketid', (req, res) => {
  const ticketid = req.params.ticketid
  tickets.getTicketDetails(req, res, db, ticketid)
})

app.post('/api/ticket', (req, res) => {
  tickets.postTicketData(req, res, db)
  }
)



app.put('/api/ticket/:ticketid', (req, res) => {
  const ticketid = req.params.ticketid
  tickets.putTicketStatus(req, res, db, ticketid)
})

app.put('/api/ticket', (req, res) => tickets.putTicketData(req, res, db))

app.delete('/api/ticket', (req, res) => tickets.deleteTicketData(req, res, db))

// Demo routes
app.get('/api/tickets/:demoid', (req, res) => {
  const demoid = req.params.demoid
  tickets.getDemoTicketData(req, res, db, demoid)
})

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Sockets & Express hookup
const server = http.createServer(app)
const io = module.exports.io = require('socket.io').listen(server)
io.on('connection', SocketManager)

// App Server Connection
server.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT || 5000}`)
})