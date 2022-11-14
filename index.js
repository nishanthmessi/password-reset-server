const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')

env.config()
const app = express()
const port = process.env.PORT

// configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

// routes
authRoutes(app)

app.get('/', (req, res) => {
  res.send('Welcome to the Server')
})

app.listen(port, async () => {
  console.log(`Server listening on port: ${port} !! `)

  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Not able to connect mongodb', error);
  }
})