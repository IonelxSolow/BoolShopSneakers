const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const serverError = require('./middlewares/serverError')
const notFound = require('./middlewares/notFound')
const shoesRouter = require('./routers/shoesRouter')

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})

//👉🏻 Middlewares

// cors middleware

app.use(cors({
  origin: 'http://localhost:5173'
}))

// body parser middleware

app.use(express.json())

// static assets middleware

app.use(express.static('public'))


// incoming request logs middleware
app.use((req, res, next) => {
  console.log(`incoming request: ${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('Welcome to the boolshop backend server')
})

// Routes middlewares

app.use('/boolshop/api/v1/shoes', shoesRouter)

// Server Error Handler Middleware

app.use(serverError)

// Client Error Handler Middleware

app.use(notFound)