const router = require('express').Router()
const ordersController = require('../controllers/ordersController')
const validateOrder = require('../middlewares/orderValidation')
const orderLogger = require('../middlewares/orderLogger')

// Apply logger middleware to all order routes
router.use(orderLogger)

// Order routes with validation
router.post('/', validateOrder, ordersController.store)
router.get('/:id', ordersController.show)

module.exports = router