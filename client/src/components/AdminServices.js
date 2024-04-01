import React, {useRef, useState } from 'react'
import './../App.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'

const AdminServices = () => {
    const [service_name, setService_name] = useState("")
    const [description, setDescription] = useState("")
    const [uploadFile, setUploadFile] = useState("")
    const file = useRef()
  
    const addService = async (e) => {
        e.preventDefault()
   
        const data = new FormData()
        data.append('service_name', service_name)
        data.append('description', description)
        data.append('uploadFile', file.current.files[0])

        try {
            const dataToAdd = await fetch('http://localhost:5000/api/admin/add/services', {
                method: 'POST',
                body: data
                
            })
            const res = await dataToAdd.json()
            console.log(res)
            setService_name("")
            setDescription("")
            setUploadFile("")

            
        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <h2 className='text-center'>Add New Service</h2>
            <form className='add-service' onSubmit={addService} encType='multipart/form-data'>
                Name: <input type='text' value={service_name} onChange={(e) => setService_name(e.target.value)} /> <br /><br />
                Description: <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} /> <br /><br />
                Image: <input type='file' value={uploadFile} ref={file} onChange={(e) => setUploadFile(e.target.value)}/> <br /><br />
                <input type='submit' value='Add Service' />
            </form>

        </>
    )
}

export default AdminServices
