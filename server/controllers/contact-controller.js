const contact = require('./../models/contactSchema')

const contactForm = async (req, res) => {
    try {
        const {name, email, message} = req.body
        if(!name, !email, !message) {
            res.status(400).json({msg: 'All fields are required'})

        }
        else {
            const data = new contact({
                name,
                email,
                message
            })
            const createContact = await data.save()
            res.status(200).json(createContact)
        }
    }
    catch(error) {
        res.status(500).json({msg:'Internal server error'})

    }

}
module.exports = contactForm