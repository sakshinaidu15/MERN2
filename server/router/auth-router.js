const express = require('express')
const router = express.Router()
const authcontroller = require('../controllers/auth-controller')
const authMiddleware = require('../middlewares/auth-middleware')

// router.get('/', (req, res) => {
//     res.status(200).send('We are using router')
// })

router.get('/', (authcontroller.home))

router.post('/register', (authcontroller.register))

router.post('/login', (authcontroller.login))

router.post('/changepassword', (authcontroller.changePassword))

router.get('/student', (authMiddleware, authcontroller.getStudent))

module.exports = router