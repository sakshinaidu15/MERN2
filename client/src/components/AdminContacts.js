import React, { useState } from 'react'

const AdminContacts = () => {

    const [contact, setContact] = useState([])

    const getData = async () => {
        try {

            const data = await fetch('http://localhost:5000/api/admin/contacts')
            const res = await data.json()
            console.log(res)
            setContact(res)
        }
        catch (error) {
            console.log(error)
        }
    }
    getData()
    return (
        <>
        {
            contact.map
        }
            

        </>
    )
}

export default AdminContacts
