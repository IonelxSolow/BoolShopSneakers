const router = require('express').Router()
const shoesController = require('../controllers/shoesController')

router.get('/search', shoesController.indexSearch)
// get all shoes 
router.get('/', shoesController.index)
//get with filters

//get dhoes for brand
router.get('/brand/:brand', shoesController.indexBrand)
//get single shoe
router.get('/:id', shoesController.show)
//update sold copies
router.patch('/:id/sold', shoesController.updateSoldCopies)

module.exports = router