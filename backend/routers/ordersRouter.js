const router = require('express').Router()
const ordersController = require('../controllers/ordersController')

router.post('/', ordersController.store)

router.get('/:id', ordersController.show)

module.exports = router