import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ProductSection from "../components/ProductSection"
import ProductItem from "../components/ProductItem"
import { CirlceExclamation, LocationIcon, HeartIcon, API_URL } from "../utils/constant"
import { CardContainer } from "../UI/Card"
import Modal from "../UI/Modal"
import Button from "../UI/Button"
import BookBoard from "../components/BookBoard"
import axios from "axios"
import { formatMoney } from "../utils/helpers"
import TemplateOne from "../UI/TemplateOne"
import Spinner from "../UI/Spinner"

const Section = ({ title, isUnderline = true, children }) => (
    <div className={"border-gray-100 py-6" + (isUnderline ? " border-b" : "")}>
        <p className="text-amber-500 uppercase font-medium">{ title }</p>
        { children }
    </div>
)

const Item = ({ IconComponent, color, text }) => (
    <div className="inline-flex items-center p-2">
        <IconComponent fill={ color } width="16px"/>
        <span className="ml-1 font-thin">{ text }</span>
    </div>
)

const Product = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    const [relativeProduct, setRelativeProduct] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                let res = await axios.get(`${API_URL}/products/${productId}`)
                const productData = res.data.data
                setProduct(productData)
    
                res = await axios.get(`${API_URL}/products?district=${productData.district}&limit=4`)
                setRelativeProduct(res.data.data)
            } catch (error) {
                console.log(error)            
            }
        })()

        window.scrollTo(0, 0)
    }, [ productId ])

    if(product)
        return (
            <>
                <ProductSection data={ product } />
                <TemplateOne>
                    <TemplateOne.Section>
                        <CardContainer id="bookNow" className="py-4 px-8 mb-24">
                            <BookBoard product={ product }/>
                        </CardContainer>
                        <Section title="MÔ TẢ - THÔNG TIN KÈM THEO" />
                        <Section title="TIỆN ÍCH">
                            <Item IconComponent={ CirlceExclamation } color="#F49E2D" text="Cần đặt cọc."/>
                            <Item IconComponent={ CirlceExclamation } color="#F49E2D" text="Tốn phí mượn bóng."/>
                            <Item IconComponent={ CirlceExclamation } color="#F49E2D" text="Tốn phí nước uống."/>
                        </Section>
                        <Section title="BẢN ĐỒ"/>
                        <Section title="HÌNH ẢNH"/>
                        <Section title="ĐÁNH GIÁ">
                            <p className="text-gray-600 font-thin mt-2">Chưa có đánh giá về địa điểm này.</p>
                        </Section>
                    </TemplateOne.Section>
                    <TemplateOne.Sidebar>
                        <Button typeStyle={ 3 } widthFull={ true } onClick={() => setShowModal(true)}>BẢNG GIÁ</Button>
                        <Modal name="BẢNG GIÁ" show={ showModal } setShow={ setShowModal }>
                            <Modal.Header>
                                <p className="font-semibold text-xl">BẢNG GIÁ</p>
                                <button onClick={() => setShowModal(false)}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                    </span>
                                </button>
                            </Modal.Header>
                            <Modal.Body>
                                <table className="border-collapse border border-slate-400">
                                    <thead>
                                        <tr>
                                            <th colSpan="2" className="border border-slate-300 text-white bg-gray-700 py-4">Sân 11 người</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-normal">
                                        <tr>
                                            <td className="border border-slate-300 p-4 align-top">Chủ Nhật, Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy</td>
                                            <td className="border border-slate-300 p-4">
                                                <ul>
                                                    {product.slot.map((e, idx) => (
                                                        <li key={idx}>
                                                            <span className="font-semibold inline-block w-24">{`${e.timeStart} - ${e.timeEnd}`}</span>
                                                            <span>{`: ${formatMoney(e.price)} / giờ`}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Modal.Body>
                        </Modal>
                        <CardContainer id="showContact" className="mt-4">
                            <p className="text-amber-500 p-4 bg-gray-100 rounded-t-sm">LIÊN HỆ</p>
                            <div className="p-4 font-light">
                                <Link to="#" className="block mb-2">
                                    <LocationIcon fill="#3E388B" width="12px" className="inline"/>
                                    <span className="ml-2 text-gray-600 text-sm">{ product.address }</span>
                                </Link>
                                <Link to="/" className="block my-6 text-amber-500 hover:opacity-70 duration-200">
                                    <HeartIcon fill="#F49E2D" width="16px" className="inline"/>
                                    <span className="ml-1 font-normal">Theo dõi sân để nhận thông báo</span>
                                </Link>
                                <p className="text-sm mt-3">2 người theo dõi địa điểm này</p>
                            </div>
                        </CardContainer>
                    </TemplateOne.Sidebar>
                </TemplateOne>
                <div className="px-4 sm:px-10 xl:px-24">
                    <Section title={`CÁC SÂN BÓNG TẠI ${product.district}`} isUnderline={ false }>
                        <div className="-ml-3 flex flex-wrap">
                            {relativeProduct.map((product, idx) => (
                                <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4" key={idx}>
                                    <ProductItem data={ product } link={ `/san-bong/${product.id}` }/>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </>
        )
    else return (
        <div className="w-min mx-auto my-20">
            <Spinner size="large"/>
        </div>
    )
}

export default Product