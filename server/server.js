const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()
const keys = require('./config/keys')

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection bases on prod or dev build
var db = require('knex')({
  client: 'pg',
  connection: keys.POSTGRES_CONNECTION_URI
});

// Controllers - aka, the db queries
const tickets = require('./controllers/tickets')

// App
const app = express()

// App Middleware
// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(helmet())
app.use(cors())
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
// app.get('/', (req, res) => res.send('hello world'))
app.get('/tickets', (req, res) => tickets.getTicketData(req, res, db))
app.post('/ticket', (req, res) => tickets.postTicketData(req, res, db))
app.put('/ticket', (req, res) => tickets.putTicketData(req, res, db))
app.delete('/ticket', (req, res) => tickets.deleteTicketData(req, res, db))

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

// App Server Connection
app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT || 5000}`)
})