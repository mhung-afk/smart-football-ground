import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { API_URL } from "../utils/constant";

const ProductItem2 = (props) => {
    const [imagePath, setImagePath] = useState('')

    useEffect(() => {
        if (props.pitch.image) {
            setImagePath(`${API_URL}/products/images/${props.pitch.image.split('/')[1]}/${props.pitch.image.split('/')[2]}`)
        }
    }, [])

    return (
        <div class="relative h-60 sm:h-72 hover:scale-105 duration-300 rounded-lg shadow-lg">
            <img class="rounded-lg w-full h-full" src={imagePath} alt={props.pitch.name} />

            <div class="z-0 rounded-lg absolute w-full h-full bottom-0 bg-slate-400/30 hover:bg-gradient-to-r hover:from-blue-700/40 hover:to-gray-700 font-bold text-gray-900 hover:text-white">
                <div className="px-3 pb-3 absolute bottom-0 w-full">
                    <p class="text-lg tracking-tight text-ellipsis overflow-hidden whitespace-nowrap">{`${props.pitch.address}, ${props.pitch.ward}, ${props.pitch.district}`}</p>
                    <div class="flex justify-between items-center">
                        <Link to={`/quan-ly/thiet-bi/${props.pitch._id}`}>
                            <span class="text-xl sm:text-ellipsis sm:overflow-hidden sm:whitespace-nowrap sm:mr-1 hover:underline">{props.pitch.name}</span>
                        </Link>
                        <Link to={`/quan-ly/san-bong/chinh-sua/${props.pitch._id}`}>
                            <svg class="h-6 w-6 sm:h-8 sm:w-8 text-black hover:text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem2