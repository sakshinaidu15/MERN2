import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../store/auth'

const Header = () => {
    const { isLoggedIn,  LogoutUser } = useContext(AuthContext)
    
    return (
        <>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/about'>About</NavLink></li>
                <li><NavLink to='/services'>Services</NavLink></li>
                <li><NavLink to='/contact'>Contact</NavLink></li>
                {
                    isLoggedIn ? (
                        <li onClick={LogoutUser}>Logout</li> )
                        : ( <>
                            <li><NavLink to='/login'>Signin</NavLink></li>
                            <li><NavLink to='/register'>Signup</NavLink></li>
                        </>
                )}





            </ul>

        </>
    )
}

export default Header
