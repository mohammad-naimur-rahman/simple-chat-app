const express = require('express')
const dotenv = require('dotenv')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()
dotenv.config()

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
