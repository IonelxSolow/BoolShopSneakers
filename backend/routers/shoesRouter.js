const router = require('express').Router()
const shoesController = require('../controllers/shoesController')

// get all shoes 

router.get('/', shoesController.index)

router.get('/:id', shoesController.show)


module.exports = router