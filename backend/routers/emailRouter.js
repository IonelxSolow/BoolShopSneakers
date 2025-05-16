const router = require('express').Router()
const emailController = require('../controllers/emailController')
const newsletterController = require('../controllers/newsletterController')

router.post('/', emailController.sendEmail)

router.post('/newsletter', newsletterController.subscribeToNewsletter)

module.exports = router