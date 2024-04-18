const jwt = require('jsonwebtoken')
const student = require('../models/studentSchema')

const verifyToken = async (req, res, next) => {
    // console.log(req.headers)

    let token = req.headers['authorization'];

    console.log(token)

    if (!token) {
        return res.status(400).json({ msg: 'A token is required for authentication' })
    }
   

    try {
        // If token is present, try to remove 'Bearer ' prefix (common practice)
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
            console.log(token)
            
        }
        

        // Verify the token
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const data = await student.findOne({_id: isVerified.id})


        // Attach the decoded user to the request object
        req.user = data

        // Proceed to the next middleware/function
        next();
    } 
    catch (error) {
        res.status(400).json({ msg: 'Invalid Token' })
    }
}





module.exports = verifyToken