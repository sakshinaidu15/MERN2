const express = require('express')
const verifyToken = require('../middlewares/auth-middleware'); 
const authcontroller = require('../controllers/auth-controller')
const router = express.Router()



// router.get('/', (req, res) => {
//     res.status(200).send('We are using router')
// })

router.get('/', (authcontroller.home))

router.post('/register', (authcontroller.register))

router.post('/login', (authcontroller.login))

router.post('/changepassword', (authcontroller.changePassword))

router.get('/student', verifyToken, authcontroller.getStudent)

module.exports = router