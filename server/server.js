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
io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });

    console.log('new message: ', data)
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

// App Server Connection
server.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT || 5000}`)
})