import axios from "axios"
import React, { useEffect, useState } from "react"
import ProductManagerItem from "../../components/ProductManagerItem"
import { API_URL } from "../../utils/constant"

const DeviceManage = (props) => {
    const [product, setProduct] = useState({name: '', address: ''})
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/products/${props.match.params.productId}/get-all-index`)
            .then(res => {
                const products = res.data.data
                const { name, address } = products[0]
                setProduct({name, address})
                setProducts(products)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <p className="my-3 font-bold text-xl text-gray-700">Thông tin thiết bị {product.name}</p>
            <p>Địa chỉ {product.address}</p>
            <div className="mt-10">
                {products && products.map(product => (
                    <div className="my-2 mx-auto">
                        <ProductManagerItem data={product} key={product.id} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default DeviceManage