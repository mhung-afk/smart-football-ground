/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import Button from "../../UI/Button";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import { API_URL } from "../../utils/constant";
const SignUp = () => {
    const [error, setError] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPw] = useState('');
    const [phone, setPhone] = useState ('');
    const [verify_password,SetVeri] = useState('');
    const history = useHistory()
        

        const Submit = async event => {
            event.preventDefault()
            try {
                
                const res = await axios.post(`${API_URL}/auth/register`, {
                    name, email, phone, password, verify_password
                })
                
                if(res.status == 200) {
                    
                alert(res.data.message);
                  window.location.href = "/dang-nhap";
                }
                else if (res.status == 400){
                    setError(res.data.message)
                    
                }}
             catch (error) {
                
                setError('Server Interval Error.')
            }
        }
    
    return (
        <div class="row pt-4 pb-8 h-4/6 justify-center">

            <div class="w-100 ">
                <h2 class="font-bold text-2xl text-center my-3 text-orange-500 uppercase">Đăng ký</h2>
                <form class="bg-slate-300 shadow-md rounded px-6 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Tên
                        </label>
                        <input onChange={(e)=>setName(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nhập tên" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Email
                        </label>
                        <input onChange={(e)=>setEmail(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            SĐT
                        </label>
                        <input onChange={(e)=>setPhone(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="SĐT" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Mật khẩu
                        </label>
                        <input onChange={(e)=>setPw(e.target.value)} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Nhập lại mật khẩu
                        </label>
                        <input onChange={(e)=>SetVeri(e.target.value)} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />

                    </div>
                    <div class="flex items-center justify-center">{error}</div>
                    <div class="flex items-center justify-center">
                        <button class="text-white bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 border border-blue-700 rounded" onClick={Submit}>Đăng ký</button>
                      

                    </div>
                    <div>
                        <div class="row pt-4 items-center justify-center ">
                            <p>Bạn đã có tài khoản Save_Ole? <span class="hover:text-blue-500 text-red-500"><Link to='/dang-nhap' className='star'>Đăng nhập</Link> </span> </p>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
