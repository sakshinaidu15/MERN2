import React, { useEffect, useState } from 'react'
import './../App.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'

const AdminDeleteServices = () => {

    const [item, setItem] = useState([])

    const getData = async () => {
        try {
            const data = await fetch('http://localhost:5000/api/admin/services')
            const res = await data.json()
            console.log(res)
            setItem(res)

        }
        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
           <table className='service-table'>
           <thead>
            <tr>
                <th>S.No</th>
                <th>Service Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Action</th>
            </tr>
           </thead>
           <tbody>
            {
                item.map((value, index) => {
                    return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.service_name}</td>
                    <td>{value.description}</td>
                    <td><img src={`http://localhost:5000/assets/${value.image}`} alt='' height='50px' width='50px'/></td>
                    <td><button className='btn-delete'>Delete</button></td>


                    </tr>
                })
            }
           </tbody>

           </table>

        </>
    )
}

export default AdminDeleteServices
