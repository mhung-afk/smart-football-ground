import React from "react"
import { TriangleExclamation, LocationIcon, StarIcon } from "../utils/constant"
import { CardHeader, CardHeaderOverlay } from "../UI/Card"
import Button from "../UI/Button"
import { getSrcFile } from "../utils/helpers"

const Item = ({ IconComponent, children }) => (
    <div className="flex my-1">
        <IconComponent fill="white" width="1rem" className="inline mr-2"/>
        { children }
    </div>
)

const ProductSection = ({ data }) => {
    return (
        <CardHeader image={ getSrcFile(data.image) } minHeight="350px">
            <CardHeaderOverlay />
            <div className="absolute left-5 right-5 md:left-28 md:right-28 bottom-10 text-white">
                <p className="text-amber-500 text-2xl md:text-4xl mb-5 font-semibold">{ `${data.name} - ${data.type}` }</p>
                <Item IconComponent={ LocationIcon }>
                    <span>{ data.address }</span>
                </Item>
                <Item IconComponent={ TriangleExclamation }>
                    <a href="#123" className="text-amber-500">Báo lỗi</a>
                </Item>
                <>
                    {[...Array(5)].map((e, idx) => (
                        <StarIcon fill={ idx >= data.voted ? "#868E96" : "#FBA62F"} width="1rem" 
                        className="mr-0.5 inline" key={idx}></StarIcon>
                    ))}
                </>
                <div className="-mt-4 tracking-wide float-right">
                    <Button type="link" to="#bookNow">ĐẶT SÂN ONLINE</Button>
                </div>
            </div>
        </CardHeader>
    )
}

export default ProductSection