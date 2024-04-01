import React, { useEffect, useState } from 'react'
import Header from './Header'

const Services = () => {

    const [item, setItem] = useState([])

    const getData = async () => {
        try {
            const data = await fetch('http://localhost:5000/api/data/service')
            // console.log(data)
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
        <Header />
        {
            item.map((value) => {
                return <h1>{value.service_name}
                <img src={`http://localhost:5000/assets/${value.image}`} alt='' height='300px' width='300px' />
                </h1>

            })
        }

        </>
    )
}

export default Services
