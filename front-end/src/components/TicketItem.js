import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "../UI/Card"
import { CalendarIcon, PhoneIcon, StarIcon, TicketIcon, UsersIcon } from "../utils/constant"
import { formatMoney } from "../utils/helpers"

const CardItem = ({ children }) => (
    <div className="py-4 border-b border-gray-200">
        { children }
    </div>
)

const CardBodyItem = ({ children }) => (
    <div className="flex items-center mb-2 font-normal text-gray-700 text-base">
        { children }
    </div>
)

const TicketItem = ({ product, time, date, price, duration, code, username, phone }) => {

    return (
        <CardContainer className="pb-4 px-6">
            <CardItem>
                <Link className="text-base font-semibold hover:underline" to={`/san-bong/${product.id}`}>{ product.name }</Link>
                <p className="text-gray-500 text-sm mt-2">{ product.address }</p>
                <>
                    {[...Array(5)].map((e, idx) => (
                        <StarIcon key={ idx } fill={ idx >= product.voted ? "#868E96" : "#FBA62F"} width="0.9rem" 
                        className="mr-0.5 inline"></StarIcon>
                    ))}
                </>
            </CardItem>
            <CardItem>
                {code && (
                    <CardBodyItem>
                        <TicketIcon fill="#FBAB30" width="1.2rem"/>
                        <p className="ml-2">{`Mã vé: ${code}`}</p>
                    </CardBodyItem>
                )}
                <CardBodyItem>
                    <UsersIcon fill="#B2B7BC" width="1.2rem"/>
                    <p className="ml-2">{username ? `Tên: ${username}` : `${product.type} (Sân 11 người)`}</p>
                </CardBodyItem>   
                {phone && (
                    <CardBodyItem>
                        <PhoneIcon fill="#B2B7BC" width="1rem"/>
                        <p className="ml-3">{`Số đt: ${phone}`}</p>
                    </CardBodyItem>
                )}
                <CardBodyItem>
                    <CalendarIcon fill="#B2B7BC" width="1rem"/>
                    <p className="ml-3 mt-1 ">{`${parseFloat(duration).toFixed(1)}h từ ${time}`}</p>
                </CardBodyItem>           
                <p className="text-gray-500 ml-7 mt-2">{`Ngày đặt: ${date}`}</p>
            </CardItem>
            <CardItem>
                <div className="flex justify-between mb-3 text-gray-700">
                    <p>Giá thuê sân</p>
                    <p>{ formatMoney(price) }</p>
                </div>
                <div className="flex justify-between text-gray-700">
                    <p>Phí dịch vụ</p>
                    <p className="line-through">27.000 VNĐ</p>
                </div>
            </CardItem>
            <div className="flex justify-between font-medium my-4">
                <p>Tổng cộng</p>
                <p>{ formatMoney(price) }</p>
            </div>
            {!code && (<p className="mt-10 text-amber-500 text-sm font-thin">Kiểm tra kỹ thông tin lịch đặt trước khi đặt.</p>)}
        </CardContainer>
    )
}

export default TicketItem