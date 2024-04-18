import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")
    const authorizationToken = `Bearer ${token}`
    const [isLoading, setIsLoading] = useState(true)

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken)
    }

    
    //tackling the logout functionality
    const LogoutUser = () => {
        setToken("")
        return localStorage.removeItem('token')

    }
    // jwt - AUTHENTICATION - to get currently loggedIN user data 

    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const data = await fetch('http://localhost:5000/api/auth/student', {
                headers: {
                    authorization: authorizationToken

                }
            })
            const res = await data.json()
            console.log(res)
            setUser(res)
            setIsLoading(false)


        }
        catch (error) {
            console.log(error)

        }

    }
    useEffect(() => {
        userAuthentication()
    }, [])
    
    const isLoggedIn = !!token
    console.log('Login', isLoggedIn)


    return <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, authorizationToken, isLoading }}>
        {children}
    </AuthContext.Provider>

}
export { AuthContext, AuthProvider}