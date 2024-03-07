/* eslint-disable react/style-prop-object */
import React, { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../contexts/AuthContext"
import { API_URL } from "../../utils/constant"


const Login = () => {
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loginHandle } = useContext(AuthContext)
    const history = useHistory()

    const login = async event => {
        event.preventDefault()
        try {
            
            const res = await axios.post(`${API_URL}/auth/login`, {
                email, password
            })
            
            if(res.status == 200) {
                const { data } = res.data
                loginHandle(data.token, data.user)
                if (data.user.user_type == 'manager')
                    history.push('/quan-ly')
                else history.push('/')
            }
            else {
                
                setError("Thông tin không chính xác")
                
            }}
         catch (error) {
            
            setError("Đăng nhập không thành công")
        }
    }
    
    return (
      
        <div class="row pt-4 pb-8 h-4/6 justify-center">

            <div class="w-100 ">
                <h2 class="font-bold text-2xl text-center my-3 text-orange-500 uppercase">Đăng nhập</h2>
                <form class="bg-slate-300 shadow-md rounded px-6 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Email
                        </label>
                        <input onChange={(event) => setEmail(event.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Mật khẩu
                        </label>
                        <input onChange={(event) => setPassword(event.target.value)} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        
                    </div>
                    <div class="flex text-red-700 items-center justify-center">{error}</div>
                    <div class="flex items-center justify-center">
                        <button class="text-white bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 border border-blue-700 rounded" onClick={login}>Đăng nhập</button>
                    </div>
                    <div>


                        <div class="row pt-6 items-center justify-center ">
                            <p>Quên mật khẩu? <span class="hover:text-blue-500 text-red-500"><Link to='#' className='star'>Nhấn tại đây</Link> </span> </p>
                        </div>
                        <br />
                        <div class="row  items-center justify-center ">
                            <p>Bạn chưa có tài khoản Save_Ole? <span class="hover:text-blue-500 text-red-500"><Link to='/dang-ky' className='star'>Đăng ký</Link> </span> </p>
                        </div>

                    </div>
                </form>
            </div>
        </div>
        
    );
    
};

export default Login;
