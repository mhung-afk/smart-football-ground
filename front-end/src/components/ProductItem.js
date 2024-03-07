import React from "react"
import { Link } from "react-router-dom"
import { StarIcon } from "../utils/constant"
import { getSrcFile } from "../utils/helpers"
import { CardContainer, CardHeader, CardHeaderOverlay } from "../UI/Card"
import { useLocation } from "react-router-dom"

const ProductItem = ({ data, link }) => {
    const { pathname } = useLocation()

    return (
        <CardContainer className="m-4 hover:shadow-2xl duration-300">
            <Link to={ link }>
                <CardHeader image={ getSrcFile(data.image) } minHeight="200px" rounded>
                    <CardHeaderOverlay />
                    <div className="absolute left-5 bottom-5 flex items-start">
                        <div>
                            <p className="text-yellow-500 text-lg">{ data.name }</p>
                            <p className="text-yellow-500 text-sm">{ data.type }</p>
                            <>
                                {[...Array(5)].map((e, idx) => (
                                    <StarIcon fill={ idx >= data.voted ? "#868E96" : "#FBA62F"} width="1rem" 
                                    className="mr-0.5 inline" key={idx}></StarIcon>
                                ))}
                            </>
                        </div>
                    </div>
                </CardHeader>
            </Link>
            <div className="py-8 px-4 sm:h-32">
                <p className="text-md font-thin hover:underline cursor-pointer">{ data.address }</p>
                <Link className="text-sm text-blue-900 hover:text-blue-500 hover:underline mr-1"
                    to={`${pathname}?phuong=${data.ward}&quan=${data.district}`} >{data.ward + ", "}</Link>
                <Link className="text-sm text-blue-900 hover:text-blue-500 hover:underline mr-1"
                to={`${pathname}?quan=${data.district}`} >{data.district}</Link>
            </div>
        </CardContainer>
    )
}

export default ProductItem