import React from "react"
import ProductItem from "../../components/ProductItem"
import { useEffect, useState } from "react"
import { API_URL } from "../../utils/constant"
import axios from "axios"

const Outstanding = () => {
    const [products, setProducts] = useState([])

    useEffect(async () => {
        try {
            const res = await axios.get(`${API_URL}/products`)
            setProducts(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className="p-10">
            <div className="ml-4 mb-10">
                <div className="ml-4 mb-10">
                    <p class="text-3xl text-orange-500 font-semibold text-center pt-6">
                        Sân bóng nổi bật
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap">
                {products.slice(0, 4).map(product => (
                    <div className="w-1/4">
                        <ProductItem data={ product } link={ `/san-bong/${product.id}`} />
                    </div>
                ))}
                
            </div>

        </div>
    )
}

export default Outstanding