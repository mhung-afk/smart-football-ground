import axios from "axios"
import { createContext, useState } from "react"
import { API_URL } from "../utils/constant"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)
    
    
    const checkAuthenticated = async () => {
        if(!accessToken) {
            const token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME)
            if(!token)
                return false
            try {
                const res = await axios.post(`${API_URL}/auth/verify-token`, { token })
                const { data } = res.data
                setUser(data.user)
                setAccessToken(token)
            } catch (error) {
                console.log(error)
                return false
            }
        }
        return true
    }

    const loginHandle = (token, user) => {
        console.log(user)
        setUser(user)
        setAccessToken(token)
        localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME,token)
    }

    const logoutHandle = () => {
        setAccessToken(null)
        setUser(null)
        localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME)
    }

    return (
        <AuthContext.Provider value={{isLoading, accessToken, user, checkAuthenticated, loginHandle, logoutHandle}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider