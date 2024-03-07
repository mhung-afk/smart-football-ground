import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function useAuthConfig() {
    const { accessToken } = useContext(AuthContext)

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
}