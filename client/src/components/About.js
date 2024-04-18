import React, { useContext } from 'react'
import Header from './Header'
import { AuthContext } from '../store/auth'

const About = () => {
    const {user} = useContext(AuthContext)

    return (
        <>
            <Header />
            {/* <h1>Welcome {user.name}</h1> */}
            <h1>Welcome {user ? `${user.name} to our website`: `to our website`}</h1>
            <h1>This is about</h1>

        </>
    )
}

export default About
