import React, { useState, useContext } from 'react'
import { AuthContext } from '../store/auth'
import {toast} from 'react-toastify'
import Header from './Header'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {storeTokenInLS} = useContext(AuthContext)

    const loginData = async (e) => {
        e.preventDefault()
        try {
            const data = await fetch('http://localhost:5000/api/auth/login',{
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            // console.log(data)
            const res = await data.json()
            console.log(res)
            storeTokenInLS(res.token)
            // alert('You have logged in')
            toast.error('You have logged in')
        }
        catch(error) {
            console.log(error)

        }
    }
    return (
        <>
        <Header />
           <form onSubmit={loginData}>
            EMAIL: <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required>
            </input> <br/><br/>

            PASSWORD: <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required>   
            </input> <br/><br/>
            <input type='submit' value='Submit'></input>
           </form>

        </>
    )
}

export default Login
