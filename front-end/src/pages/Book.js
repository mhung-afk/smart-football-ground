import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constant"
import { useQuery } from "../utils/helpers"
import Button from "../UI/Button"
import Spinner from "../UI/Spinner"
import TemplateOne from "../UI/TemplateOne"
import TicketItem from "../components/TicketItem"
import { AuthContext } from "../contexts/AuthContext"

const Book = ({props}) => {
    const { user, accessToken } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState(null)
    const [username, setUsername] = useState(user.name)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState({name: null, phone: null})
    const history = useHistory()
    const query = useQuery()


    const time = query.get('time'), date = query.get('date'), price = query.get('price'), 
    duration = query.get('duration'), productId = query.get('id')

    useEffect(() => {
        const run = async () => {
            try {
                const res = await axios.get(`${API_URL}/products/${productId}`)
                setProduct(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        run()
    }, [])
    
    const handleSubmit = async () => {
        if (!phone) {
            setError(error => ({...error, phone: 'Vui lòng nhập số điện thoại.'}))
        } else if (!username) {
            setError(error => ({...error, name: 'Vui lòng nhập tên người đặt.'}))
        } else {
            setIsLoading(true)
            try {
                const data = {
                    timeStart: time,
                    dateStart: date,
                    price: price,
                    username: username,
                    user_phone: phone,
                    product_index_id: productId
                }
                const configs = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
                const res = await axios.post(`${API_URL}/tickets/create`, data, configs)
                const { _id } = res.data.data
                history.push(`/tickets/${_id}`)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
    }

    return (
        <>
            <TemplateOne title="đặt sân">
                <TemplateOne.Section>
                    <div className="flex justify-between text-lg sm:text-2xl font-medium">
                        <p className="">Thông tin người đặt</p>
                        <p className="text-gray-500">Bước 1</p>
                    </div>
                    <div className="border-b border-gray-200 mt-6 pb-2">
                        <div className="mb-8">
                            <label htmlFor="name" className="block mb-3">Họ và tên</label>
                            <input id="name" type="text" value={ username } onChange={e => setUsername(e.target.value)}
                            className="text-gray-700 rounded-md border border-gray-300 py-2 px-4 w-full outline-none duration-300 focus:ring-2 focus:border-blue-300"/>
                            {error.name && <span className="text-red-500 font-semibold text-sm">{error.name}</span>}
                        </div>
                        <div className="mb-8">
                            <label htmlFor="name" className="block mb-3">Số điện thoại</label>
                            <input id="phone" type="text" value={ phone } onChange={e => setPhone(e.target.value)}
                            className="text-gray-700 rounded-md border border-gray-300 py-2 px-4 w-full outline-none duration-300 focus:ring-2 focus:border-blue-300"/>
                            {error.phone && <span className="text-red-500 font-semibold text-sm">{error.phone}</span>}
                        </div>
                    </div>
                    <div className="border-b border-gray-200 mt-6 pb-8">
                        <p className="text-xl font-medium mb-6">Phương thức thanh toán</p>
                        <input type="radio" id="payment" defaultChecked={ true }/>
                        <label htmlFor="payment" className="text-sm ml-2 font-light">Thanh toán online</label>
                        <p className="text-gray-500 text-sm">
                            Được đảm bảo bởi Sporta khi có tranh chấp. Hoàn tiền 100% nếu hủy sân trước giờ quy định.
                        </p>
                    </div>
                </TemplateOne.Section>
                <TemplateOne.Sidebar>
                    {product && (
                        <TicketItem product={ product } time={ time } date={ date } price={ price } duration={ duration }/>
                    )}
                </TemplateOne.Sidebar>
            </TemplateOne>
            <div className="px-4 mb-5 float-right sm:px-10 xl:px-24">
                <Button customClass="flex items-center" onClick={handleSubmit}>
                    <p className="mr-2">{'Đặt sân >'}</p>
                    { isLoading && <Spinner size="small"/> }
                </Button>
            </div>
        </>
    )
}

export default Book