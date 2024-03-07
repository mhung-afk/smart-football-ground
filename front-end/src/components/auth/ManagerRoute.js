import { useContext, useEffect, useState} from "react"
import { Route, Redirect, useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import Spinner from "../../UI/Spinner"

const ManagerRoute = ({ children, ...rest }) => {
    const { checkAuthenticated, user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const run = async () => {
            const check = await checkAuthenticated()
            if(!check)
                history.push('/dang-nhap')
            else setIsLoading(false)
        }
        run()
    }, [])

    return isLoading ? (
        <div className="w-min mx-auto my-20">
            <Spinner size="large" color="blue"/>
        </div>
    ) : (
        <Route {...rest}>
            {user.user_type === 'manager' ? (children) : (<Redirect to='/'/>)}
        </Route>
    )
}

export default ManagerRoute