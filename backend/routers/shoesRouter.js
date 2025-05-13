const router = require('express').Router()
const shoesController = require('../controllers/shoesController')
//serach route
router.get('/search', shoesController.indexSearch)
// get all shoes 
router.get('/', shoesController.index)
//get newest shoes
router.get('/new', shoesController.indexNewProducts)
//get popular shoes
router.get('/popular', shoesController.indexPopularProducts)
//get on sale shoes
router.get('/sale', shoesController.indexOnSale)
//get dhoes for brand
router.get('/brand/:brand', shoesController.indexBrand)
//get shoes with related tags
router.get('/tags', shoesController.showItemsOnTags)
//get single shoe
router.get('/:id', shoesController.show)

//update sold copies
router.patch('/:id/sold', shoesController.updateSoldCopies)

module.exports = router