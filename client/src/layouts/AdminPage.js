import React, { useContext } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import './../App.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'
import './../../node_modules/bootstrap/dist/js/bootstrap.js'
import { AuthContext } from '../store/auth.js'

const AdminPage = () => {
    

    const {user, isLoading} = useContext(AuthContext)
    console.log('admin page', user)

    if(isLoading) {
        return <h1>Loading...</h1>
    }
    if(!user.isAdmin) {
        return <Navigate to="/" />
    }
    
    return (
        <>
            <ul className='list-container'>
                <li className='list-item'><NavLink to="/admin/students">Users</NavLink></li>
                <li className='list-item'><NavLink to="/admin/contacts">Contacts</NavLink></li>
                <li className='list-item dropdown dropdown-toggle' data-bs-toggle="dropdown">Services</li>
                <ul class="dropdown-menu">
                    <li><NavLink to='/admin/service' class="dropdown-item">Add Services</NavLink></li>
                    <li><NavLink to='/admin/service/delete' class="dropdown-item">Delete Services</NavLink></li>
                    
                </ul>

                <li className='list-item mt-3'><NavLink to="/">Home</NavLink></li>
            </ul>

            <Outlet />
           

        </>

    )
}

export default AdminPage
