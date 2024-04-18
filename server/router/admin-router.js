const express = require('express')
const verifyToken = require('../middlewares/auth-middleware')
const adminController = require('../controllers/admin-controller')
const router = express.Router()

router.get('/students', verifyToken, adminController.getAllStudents)
router.get('/contacts', (adminController.getAllContacts))
router.get('/students/:id', (adminController.getSingleStudent))
router.put('/students/update/:id', (adminController.updateStudentById))
router.delete('/students/delete/:id', (adminController.deleteStudentById))
router.post('/add/services', (adminController.addServices))
router.get('/services', (adminController.services))
router.delete('/delete/services/:id', (adminController.deleteServices))

module.exports = router

