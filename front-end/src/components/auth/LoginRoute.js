import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Route } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import Spinner from "../../UI/Spinner"

const LoginRoute = ({children, ...rest}) => {
    const { checkAuthenticated } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    
    useEffect(() => {
        const run = async () => {
            const check = await checkAuthenticated()
            if(check)
                history.goBack()
            else
                setIsLoading(false)
        }
        run()
    }, [])
    return isLoading ? (
        <div className="w-min mx-auto my-20">
            <Spinner size="large" color="blue"/>
        </div>
    ) : (
        <Route {...rest} >
            { children }
        </Route>
    )
}

export default LoginRoute