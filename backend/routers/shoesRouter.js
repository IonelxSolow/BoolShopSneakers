const router = require('express').Router()
const shoesController = require('../controllers/shoesController')

// get all shoes 

router.get('/', shoesController.index)

module.exports = router