const express = require('express')
const dotenv = require('dotenv')
const port = process.env.PORT || 5000
const chats = require('./data/data')
const connectDB = require('./config/db')

const app = express()
dotenv.config()

app.get('/', (req, res) => {
  res.send('Hello Duniya!')
})

app.get('/api/chat', (req, res) => {
  res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
  const chat = chats.find(c => c._id === req.params.id)
  res.send(chat)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
