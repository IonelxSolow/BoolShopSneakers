const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 3000
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
  origin: [process.env.LOCAL_FRONTEND_URL, process.env.FRONTEND_URL]
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

// Checkout validation rules endpoint for frontend consumption
app.get('/boolshop/api/v1/config/checkout-validation', (req, res) => {
  res.json({
    validation_rules: {
      name: {
        required: true,
        pattern: "^[A-Za-z\\s]+$",
        message: "Name should only contain letters and spaces"
      },
      email: {
        required: true,
        pattern: "^\\S+@\\S+\\.\\S+$",
        message: "Invalid email format"
      },
      phone: {
        required: true,
        pattern: "^\\d+$",
        minLength: 8,
        maxLength: 15,
        message: "Phone number should only contain 8-15 digits"
      },
      address: {
        required: true,
        minLength: 5
      },
      shipping_methods: ["standard", "express"],
      payment_types: ["card"],
      card: {
        number: {
          required: true,
          pattern: "^\\d{16}$",
          luhnCheck: true
        },
        expiryDate: {
          required: true,
          pattern: "^(0[1-9]|1[0-2])\\/\\d{2}$",
          message: "Format must be MM/YY"
        },
        cvv: {
          required: true,
          pattern: "^\\d{3,4}$",
          message: "CVV must be 3 or 4 digits"
        }
      }
    }
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