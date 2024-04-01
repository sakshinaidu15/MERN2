import React, { useContext, useState } from 'react'
import { AuthContext } from '../store/auth'
import Header from './Header'

const Signup = () => {

    const [student, setStudent] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        confirm_password: ''
    })

    const {storeTokenInLS} = useContext(AuthContext)

    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setStudent({
            ...student,
            [name]:value
        })
    }
    
    const sendData = async (e) => {
        e.preventDefault()
        // alert(student)
        try {
            const data = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(student),
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
                
            })
            // console.log(data)
            const res = await data.json()
            console.log(res)
            if(!student.name || !student.email || !student.contact || !student.password || !student.confirm_password) {
                alert('All fields are required')
            }
            storeTokenInLS(res.token)
            setStudent({
                name: '',
                email: '',
                contact: '',
                password: '',
                confirm_password: ''
            })
        }
        catch (error) {
            console.log(error)

        }
    }
    return (
        <>
      <Header />
            <h1>Signup</h1>
            <form onSubmit={sendData}>
                NAME :
                <input
                    type='text'
                    name='name'
                    placeholder='Enter your name'
                    
                    value={student.name}
                    onChange={handleInput}
                   
                /> <br /><br />
                EMAIL :
                <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                     
                    value={student.email}
                    onChange={handleInput}
                   
                /> <br /><br />
                CONTACT :
                <input
                    type='number'
                    name='contact'
                    placeholder='Enter your contact'
                
                    value={student.contact}
                    onChange={handleInput}
                    
                /> <br /><br />
                PASSWORD :
                <input
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    onChange={handleInput}
                    
                    value={student.password}
                    
                /> <br /><br />
                CONFIRM PASSWORD :
                <input
                    type='password'
                    name='confirm_password'
                    placeholder='Enter confirm password'
                    onChange={handleInput}
                    
                    value={student.confirm_password}
                
                /> <br /><br />
                <input type='submit' value='Submit'></input>

            </form>

        </>
    )
}

export default Signup
