const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String ,
        require: true
    },
    contact: {
        type: String ,
        require: true
    },
    password: {
        type: String ,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const Student = new mongoose.model('Student', studentSchema)
module.exports = Student