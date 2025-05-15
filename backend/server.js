const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const serverError = require('./middlewares/serverError')
const notFound = require('./middlewares/notFound')
const shoesRouter = require('./routers/shoesRouter')
const ordersRouter = require('./routers/ordersRouter')
const emailRouter = require('./routers/emailRouter')
const shippingService = require('./services/shippingService')
/* const guestRouter = require('./routers/guestRouter') */

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

// Health check endpoint that returns shipping configuration
app.get('/boolshop/api/v1/config/shipping', (req, res) => {
  res.json({
    free_shipping_threshold: shippingService.FREE_SHIPPING_THRESHOLD,
    shipping_costs: shippingService.SHIPPING_COSTS
  })
})

// Routes middlewares

// shoes routes
app.use('/boolshop/api/v1/shoes', shoesRouter)

// orders routes
// This route is used to create a new order
app.use('/boolshop/api/v1/orders', ordersRouter)

// email routes
app.use('/boolshop/api/v1/send-email', emailRouter)


// Server Error Handler Middleware

app.use(serverError)

// Client Error Handler Middleware

app.use(notFound)