import React from 'react'
import Header from './Header'

const Contact = () => {
    return (
        <>
        <Header />
        <form>
            Name: <input type='text'/> <br/><br/>
            Email: <input type='email'/> <br/><br/>
            Message: <input type='text'/> <br/><br/>
            <input type='submit' value="Submit"/>
        </form>

        </>
    )
}

export default Contact
