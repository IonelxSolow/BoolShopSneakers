const router = require('express').Router()
const shoesController = require('../controllers/shoesController')

// get all shoes 
router.get('/', shoesController.index)
//get dhoes for brand
router.get('/brand/:brand', shoesController.indexBrand)
//get single shoe
router.get('/:id', shoesController.show)
//update sold copies
router.patch('/:id/sold', shoesController.updateSoldCopies)

module.exports = router