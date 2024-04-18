const student = require('./../models/studentSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const home = async (req, res) => {
    try {
        res.status(200).send('We are using router')

    }
    catch (error) {
        console.log(error)

    }

}
const register = async (req, res) => {
    // console.log(req.body)
    const { name, email, contact, password, confirm_password } = req.body

    if (!name || !email || !contact || !password || !confirm_password) {
        res.status(400).json({ msg: 'All fields are required' })
        
    }
    else {
        const emailExist = await student.findOne({ email: email })
        if (emailExist) {
            res.status(400).json({ msg: 'Email already exits' })
        }
        else {
            if (password === confirm_password) {
                try{
                    const hashedPass = await bcrypt.hash(password, 10) 
                    const data = new student({
                        name: name,
                        email: email,
                        contact: contact,
                        password: hashedPass

                        
                    })
                    const studentCreated = await data.save()

                    const storedData = await student.findOne({ email: email })
                    const token = jwt.sign({id: storedData._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
                    res.status(201).json({msg: studentCreated, "token": token})
                   
                }
                catch (error) {
                    console.log(error)
                    res.status(400).json({msg: 'Unable to register'})

                }
            }
            else {
                res.status(400).json({ msg: 'Password and confirm password should be same' })
            }
        }
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const userExist = await student.findOne({ email: email })
            if (userExist) {
                const isMatch = await bcrypt.compare(password, userExist.password)
                if ((userExist.email === email) && isMatch) {
                    const token = jwt.sign({id: userExist._id} , process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
                    res.status(200).json({ msg: 'You have logged in', token: token })
                }
                else {
                    res.status(400).json({ msg: 'Email or password is not valid' })
                }
            }
            else {
                res.status(400).json({ msg: 'You are not a registered user' })
            }
        }
        else {
            res.status(400).json({ msg: 'All fields are required' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).json({msg: 'Unable to login'})
    }
   
}
const changePassword = async (req, res) => {
    const {password, confirm_password} = req.body
    if(password && confirm_password) {
        if(password !== confirm_password) {
            res.status(400).json({msg: 'Password and confirm password should be same'})

        }
        else {
            const hashedPass = await bcrypt.hash(password, 10)

           
        }

    }
    else {
        res.status(400).json({msg: 'All fields are required'})

    }

}
const getStudent = async (req, res) => {
    try {
        const studentData = req.user
        console.log(studentData)
        return res.status(200).json(studentData)

    }
    catch (error) {
        res.status(500).json({msg: 'Unable to find data'})

    }

}


module.exports = { home, register, login, changePassword, getStudent}