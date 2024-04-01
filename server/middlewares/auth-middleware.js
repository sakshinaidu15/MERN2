const jwt = require('jsonwebtoken')
const student = require('../models/studentSchema')

const authMiddleware = async (req, res, next) => {

    const token = req.header("Authorization")
    if(!token) {
        res.status(400).json({msg: 'Unauthorized HTTP, token not provided'})
    }
    console.log(token)
   
    //Removing the 'Bearer' prefix
    const jwtToken = token.replace('Bearer', '').trim()
    console.log('token from auth middleware', jwtToken)

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
 
        const studentData = await student.findOne({_id: isVerified._id})
        // console.log(studentData)
        req.student = studentData
        next()

    }
    catch (error) {
        res.status(500).json({msg: 'Invalid token'})

    }
    
    

}

module.exports = authMiddleware