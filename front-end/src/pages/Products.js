import React, { useEffect, useState } from "react"
import axios from "axios"
import ProductItem from "../components/ProductItem"
import Pagination from "../UI/Pagination"
import Spinner from "../UI/Spinner"
import { API_URL } from "../utils/constant"
import { useQuery, objectToQueryString } from "../utils/helpers"

const Products = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState(null)
    const query = useQuery()
    const page = query.get('page') ? parseInt(query.get('page')) : 1
    const ward = query.get('phuong'), district = query.get('quan')
    
    useEffect(() => {
       (async () => {
            setIsLoading(true)
            try {
                let queryObj = {}
                if(page) queryObj.page = page
                if(ward) queryObj.ward = ward
                if(district) queryObj.district = district
    
                const res = await axios.get(`${API_URL}/products?${objectToQueryString(queryObj)}`)
                setProducts(res.data.data)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        })()

        window.scrollTo(0, 0)
    }, [page, ward, district])
    
    return (
        <div className="p-10">
            <div className="md:ml-4 mb-10">
                <p className="font-semibold text-2xl text-center md:text-left">Sân bóng đá mini
                    <span className="text-white rounded-2xl bg-blue-400 py-1 px-4 ml-2 block md:inline">
                        {`${ward ? `${ward}, ` : ""}${district ? `${district}, ` : ""}Tp Hồ Chí Minh`}
                    </span>
                </p>
            </div>
            <div className="flex flex-wrap">
                {isLoading && (
                    <div className="w-min mx-auto my-20">
                        <Spinner size="large" color="blue"/>
                    </div>
                )}
                {products?.map(product => (
                    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                        <ProductItem data={ product } link={ `/san-bong/${product.id}` } />
                    </div>
                ))}
                {products?.length === 0 && (
                    <p className="ml-4 text-red-500 text-3xl">Hiện tại chưa có sân bóng nào.</p>
                )}
            </div>
            <div className="mt-12 text-center md:text-right">
                <Pagination 
                next={`/san-bong?${ward ? `phuong=${ward}&` : "" }${district ? `quan=${district}&` : ""}page=${page + 1}`} 
                previous={`/san-bong?${ward ? `phuong=${ward}&` : "" }${district ? `quan=${district}&` : ""}page=${page - 1}`} 
                disabled={page === 1}/>
            </div>
        </div>
    )
}

export default Products