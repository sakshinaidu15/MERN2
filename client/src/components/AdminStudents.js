import React, { useContext, useEffect, useState } from 'react'
import './../App.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'
import './../../node_modules/bootstrap/dist/js/bootstrap.js'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../store/auth.js'

const AdminStudents = () => {

    const [students, setStudents] = useState([])
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")

    const {authorizationToken} = useContext(AuthContext)

    const getData = async () => {
        try {
            const data = await fetch('http://localhost:5000/api/admin/students', {
                headers: {
                    authorization:authorizationToken
                }

            })
            const res = await data.json()
            console.log(res)
            setStudents(res)
        }
        catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getData()
    }, [])

    const getSingleData = async (id) => {
        try {
            const data = await fetch(`http://localhost:5000/api/admin/students/${id}`)
            const res = await data.json()
            console.log(res)
            setId(res._id)
            setName(res.name)
            setEmail(res.email)
            setContact(res.contact)
        
         

        }
        catch (error) {
            console.log(error)
        }
    }

    const editData = async () => {
        try {
            const data = await fetch(`http://localhost:5000/api/admin/students/update/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name,
                    email,
                    contact
                }),
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            const res = await data.json()
            console.log(res)
            if(res.msg === 'Data updated') {
                getData()
            }
            

        }
        catch (error) {
            console.log(error)

        }

    }
    
    const deleteData = async () => {
        try {
            const data = await fetch(`http://localhost:5000/api/admin/students/delete/${id}`, {
                method: "DELETE"
            })
            const res = await data.json()
            console.log(res)
            if(res.msg) {
                getData()
            }
          
        }
        catch (error) {
            console.log(error)
        }


    }
    return (
        <>
            <table className='student-table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    students.map((value, index) => {
                        return <tbody key={value._id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td>{value.contact}</td>
                                <td><NavLink to='/admin/students/edit'><button className='btn-edit' data-bs-toggle="modal" data-bs-target="#edit" onClick={() => getSingleData(value._id)}>Edit</button></NavLink> | <button className='btn-delete' data-bs-toggle="modal" data-bs-target="#delete" onClick={() => setId(value._id)}>Delete</button></td>
                            </tr>
                        </tbody>

                    })
                }
            </table>
            <div className="modal fade" id="edit">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Edit Data</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body">
                            <form>
                                Name: <input type='text' value={name} onChange={(e) => setName(e.target.value)} /> <br /><br />
                                Email: <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} /> <br /><br />
                                Contact: <input type='text' value={contact} onChange={(e) => setContact(e.target.value)} />
                            </form>
                        </div>


                        <div className="modal-footer">
                            <button type='button' className='btn btn-update' data-bs-dismiss="modal" onClick={editData}>Update</button>
                            <button type="button" className='btn btn-cancel' data-bs-dismiss="modal">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="delete">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Delete Data</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body">
                            <h3>Are you sure want to delete?</h3> <br/>
                            <button type='button' className='btn btn-update me-3' data-bs-dismiss="modal" onClick={deleteData}>Ok</button>
                            <button type="button" className='btn btn-cancel' data-bs-dismiss="modal">Cancel</button>

                        </div>




                    </div>
                </div>
            </div>


        </>
    )
}

export default AdminStudents
