import { createContext, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'))

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken)
    }

    
    //tackling the logout functionality
    const LogoutUser = () => {
        setToken("")
        return localStorage.removeItem('token')

    }
    const isLoggedIn = !!token
    console.log('Login', isLoggedIn)


    return <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn }}>
        {children}
    </AuthContext.Provider>

}
export { AuthContext, AuthProvider }