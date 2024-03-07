import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import TemplateOne from "../UI/TemplateOne"
import TicketItem from "../components/TicketItem"
import { FileIcon, MoneyIcon, API_URL } from "../utils/constant"
import Spinner from "../UI/Spinner"
import momoLogo from "../assets/images/momo.png"
import momoQR from "../assets/images/momoQR.jpg"
import Button from "../UI/Button"
import axios from "axios"
import { formatMoney } from "../utils/helpers"
import Modal from "../UI/Modal"
import useAuthConfig from "../hooks/useAuthConfig"

const Ticket = () => {
    const [checkoutSuccess, setCheckoutSuccess] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { ticketId } = useParams()
    const [ticket, setTicket] = useState(null)
    const authConfig = useAuthConfig()

    const checkout = async () => {
        try {
            await axios.post(`${API_URL}/tickets/${ticketId}/edit`, {status: "completed"}, authConfig)
            setCheckoutSuccess(true)
            setShowModal(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${API_URL}/tickets/${ticketId}`, authConfig)
                const { data } = res.data
                let date = data.dateStart.split('T')[0]
                data.dateStart = date
                setTicket(data)
            } catch (error) {
                console.log(error)
            }
        })()
        
        setTimeout(checkout, 5000)
    }, [])

    return ticket && (
        <>
            <TemplateOne title="đặt sân">
                <TemplateOne.Section>
                    <div className="flex justify-between text-lg sm:text-2xl font-medium">
                        <p className="">Chờ thanh toán</p>
                        <p className="text-gray-500">Bước 2</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-8">Thanh toán bằng một trong những cách sau</p>
                    <div className="border border-gray-300 rounded-md my-4">
                        <div className="py-4 px-8 bg-gray-100 rounded-t-md">
                            <img src={ momoLogo } alt="momo logo" className="w-6 h-6 inline mr-4"/>
                            <span className="text-blue-700 font-medium tracking-wide text-sm">MOMO</span>
                        </div>
                        <div className="py-4 px-8 border-y border-gray-300">
                            <p>
                                {`Thực hiện chuyển tiền (${formatMoney(ticket.price)}) vào tài khoản bên dưới với nội dung chuyển tiền là`}
                                <span className="uppercase font-semibold ml-2">{ ticket.code }</span>
                            </p>
                            <img src={ momoQR } alt="momo QR" className="w-96 h-96"/>
                        </div>
                        <div className="py-4 px-8 bg-gray-100 rounded-b-md">
                            <MoneyIcon fill="#2E62EC" className="inline mr-4 w-6"/>
                            <span className="text-blue-700 uppercase font-medium tracking-wide text-sm">Chuyển khoản</span>
                        </div>
                    </div>
                </TemplateOne.Section>
                <TemplateOne.Sidebar>
                    <TicketItem product={ ticket.product_index_id } time={ ticket.timeStart } date={ ticket.dateStart }
                    code={ ticket.code } username={ ticket.username } phone={ ticket.phone } price={ ticket.price } duration={1}/>
                </TemplateOne.Sidebar>
            </TemplateOne>
            <div className="text-center">
                <div className="flex justify-center">
                    {!checkoutSuccess && (
                        <div className="my-8">
                            <Spinner size="big"/>
                        </div>
                    )}
                    <Modal show={ showModal } setShow={ setShowModal }>
                        <Modal.Header>
                            <p className="font-semibold text-xl text-red-600">THÔNG BÁO</p>
                            <button onClick={() => setShowModal(false)}
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                                </span>
                            </button>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-left text-green-700 font-semibold">Thanh toán thành công !</p>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="mb-14 flex flex-wrap justify-center md:space-x-3">
                    <div className="my-3">
                        <Button type="link" to="/ca-nhan/lich-su-dat-ve">
                            <FileIcon fill="white" className="inline w-3"/>
                            <span className="uppercase font-medium ml-2">Lịch sử đặt sân</span>
                        </Button>
                    </div>
                    <div className="my-3">
                        <Button typeStyle={2} type="link" to="/">
                            <span className="uppercase font-medium">trở lại trang chủ</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
    
    
}

export default Ticket