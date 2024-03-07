import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Modal from "../UI/Modal"
import { MaleIcon, API_URL } from "../utils/constant"
import { convertDateToString, objectToQueryString } from "../utils/helpers"
import useWindowSize from "../hooks/useWindowSize"

const Item = ({ title, text, onClick, active = false, disabled = false}) => {
    const classname = "cursor-pointer text-sm py-1 w-24 border border-indigo-800 rounded-md duration-200 " + 
    (active ? "bg-indigo-800 text-white" : "text-indigo-800 hover:bg-indigo-800 hover:text-white")
    return (
        <button className={ classname } onClick={ onClick } disabled={ disabled }>
            <p className="font-semibold text-center">{ title }</p>
            <p className={disabled ? "text-red-400" : ""}>{ text }</p>
        </button>
    )
}

const BookBoard = ({ product }) => {
    const [showModal, setShowModal] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [index, setIndex] = useState(0)
    const [slot, setSlot] = useState([])
    const [width] = useWindowSize()
    
    const today = new Date()

    const convertDay = day => {
        day = day%7 + 1
        return day > 1 ? ("T" + day) : ("CN")
    }
    const formatDDMM = (date, month) => {
        date = String(date).padStart(2, '0')
        month = String(month).padStart(2, '0')
        return date + '-' + month
    }

    const checkOutTime = (timeStart, dateStart) => {
        const date = new Date(`${dateStart} ${timeStart}`)
        const current = new Date()
        const distanceHours = parseInt((date.getTime() - current.getTime()) / (1000 * 60 * 60))
    
        return distanceHours <= 4 ? true : false
    }

    useEffect(() => {
        (async () => {
            let date = new Date()
            date.setDate(date.getDate() + index)
            try {
                const res = await axios.post(`${API_URL}/products/${product.id}/check-slot`, {
                    slot: product.slot,
                    date: convertDateToString(date)
                })
                let { data } = res.data
                setSlot(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [ index ])

    useEffect(() => setIsSmallScreen(width <= 640), [ width ])

    return (
        <>
            <p className="text-amber-500 mb-8">CHỌN NGÀY ĐẶT</p>
            {isSmallScreen ? (
                <div className="text-center">
                    <select onChange={(e) => setIndex(parseInt(e.target.value))}
                    className="text-center px-5 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base">
                        {[...Array(7)].map((e,idx) => {
                            if(idx > 0) today.setDate(today.getDate() + 1)
                            const day = today.getDay()
                            const date = today.getDate(), month = today.getMonth() + 1
                            return <option value={idx} key={idx}
                            className="text-center">{`${convertDay(day)} / ${formatDDMM(date, month)}`}</option>
                        })}
                    </select>
                </div>
            ) : (
                <div className="flex justify-center space-x-2">
                    {[...Array(7)].map((e,idx) => {
                        if(idx > 0) today.setDate(today.getDate() + 1)
                        const day = today.getDay()
                        const date = today.getDate(), month = today.getMonth() + 1
                        return ( <Item title={convertDay(day)} text={formatDDMM(date, month)} active={idx === index} key={idx}
                                onClick={() => setIndex(idx)}/> )
                    })}
                </div>
            )}
            <p className="font-light text-sm my-4">Sân còn trống vào các khoảng thời gian sau</p>
            {slot && (
                <div className="text-center mb-8">
                    <div className="text-2xl text-white py-2 bg-amber-500 flex items-center justify-center">
                        <p>SÂN 11</p>
                        <MaleIcon className="ml-2" fill="white" width="10px"/>
                    </div>
                    <p className="text-3xl font-medium my-6">00:00 - 24:00</p>
                    <p className="font-light text-base">Đặt nhanh 60 phút từ:</p>
                    <div className="flex justify-center flex-wrap">
                        {slot.map((e, idx) => (
                            <Link to={`/dat-san?${objectToQueryString({id: product.id, price: e.price, time: e.timeStart, date: e.date, duration: 1})}`} 
                            className={"inline-block m-1" + (e.isEmpty ? "" : " pointer-events-none select-none")} 
                            onClick={ event => {
                                const check = checkOutTime(e.timeStart, e.date)
                                if(check) {
                                    event.preventDefault()
                                    setShowModal(true)
                                }
                            }} key={idx}>
                                <Item title={e.timeStart} text={e.isEmpty ? "Còn trống" : "Đã đật"} disabled={!e.isEmpty} active={!e.isEmpty}/>
                            </Link>
                        ))}
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
                                <p className="text-left">Không hỗ trợ đặt sân sát giờ thi đấu 4 tiếng.<br/> Vui lòng gọi điện cho chủ sân hoặc chọn giờ khác!</p>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            )}

        </>
    )
}

export default BookBoard