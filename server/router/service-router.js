const express = require('express')
const services = require('../controllers/service-controller')
const router = express.Router()

// router.route('/service').get(services)
router.get('/service', services)


module.exports = router