const student = require('./../models/studentSchema')
const contact = require('./../models/contactSchema')
const service = require('./../models/serviceSchema')

const path = require('path');
const filePath = path.join(__dirname, '..', 'assets');
const fs = require('fs');


const getAllStudents = async (req, res) => {
    try {
        const studentData = await student.find()
        // console.log(studentData)
        if (!studentData || studentData.length === 0) {
            return res.status(404).json({ msg: 'No data found' })
        }
        else {
            return res.status(200).json(studentData)
        }

    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })

    }

}
const getAllContacts = async (req, res) => {
    try {
        const contactData = await contact.find()
        console.log(contactData)
        if (!contactData || contactData.length === 0) {
            return res.status(404).json({ msg: 'No contacts found' })
        }
        else {
            return res.status(200).json(contactData)
        }

    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })

    }

}
const getSingleStudent = async (req, res) => {
    const id = req.params.id
    try {
        const data = await student.findOne({ _id: id })
        if (!data) {
            res.status(400).json({ error: 'No student found' })
        }
        else {
            res.status(200).json(data)

        }
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })

    }

}
const updateStudentById = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const updateStudent = await student.updateOne({ _id: id }, { $set: data })
        res.status(200).json(updateStudent)
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })

    }


}
const deleteStudentById = async (req, res) => {
    try {
        const id = req.params.id
        await student.deleteOne({ _id: id })
        res.status(200).json({ msg: 'Student is deleted' })
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })

    }

}

const addServices = async (req, res) => {
    try {
        const { service_name, description } = req.body
        const { uploadFile } = req.files
        console.log(uploadFile)
        if (!service_name || !description) {
            res.status(400).json({ msg: 'All fields are required' })
        }
        else {
            uploadFile.mv(path.join(filePath, uploadFile.name))
            const data = new service({
                service_name,
                description,
                image: uploadFile.name
            })
            const createService = await data.save()
            res.status(200).json(createService)

        }

    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })

    }

}
const services = async (req, res) => {
    try {
        const getData = await service.find()
        if (!getData) {
            res.status(400).json({ msg: 'No service found' })
        }
        else {
            res.status(200).json(getData)
        }

    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })

    }

}
const deleteServices = async (req, res) => {
    try {
        const id = req.params.id
        const data = await service.findById(id);

        if (!data) {
            return res.status(404).json('Data not found');
        }

        // Delete the file from the static folder
        const filePath = path.join(__dirname, '..', 'assets', data.image);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await service.findByIdAndDelete(id);

        res.status(200).json('Data and file deleted');
    }
    catch (error) {
        res.status(500).json('Error deleting data');
    }

}
module.exports = { getAllStudents, getAllContacts, getSingleStudent, deleteStudentById, updateStudentById, addServices, services, deleteServices }