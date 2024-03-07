import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { API_URL } from "../../utils/constant";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import ProductItem2 from "../../components/ProductItem2";
const listPos = require('../../assets/locationData.json')

const PitchManage = () => {
    const [district, setDistrict] = useState(-1)
    const [listDistricts, setListDistricts] = useState([])
    const [listPitch, setListPitch] = useState([])

    const { accessToken } = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        axios.get(`${API_URL}/products/districts`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => {
            setListDistricts(res.data.data)
        })
            .catch(err => alert(err))
    }, [])

    useEffect(() => {
        let reqQuery = ''
        if (district != -1) {
            reqQuery += `?district=${listPos.Districts[district].Name}`
        }
        axios.get(`${API_URL}/products/all${reqQuery}`)
            .then(res => {
                setListPitch(res.data.data)
            })
            .catch(err => alert(err))
    }, [district])

    var selectDistricts = () => listPos.Districts.map((value, index) => {
        if (listDistricts.indexOf(value.Name) != -1)
            return <option value={index}>{value.Name}</option>
        return null
    })

    return (
        <>
            <p className="my-3 font-bold text-xl text-gray-700">Quản lý sân bóng</p>
            <button type="button" class="py-2 px-3 my-8 border border-gray-300 rounded-md shadow-sm text-base leading-4 font-medium text-white bg-amber-500 hover:bg-amber-600" onClick={() => history.push('/quan-ly/san-bong/them')}>
                Thêm chi nhánh mới
            </button>

            <div class="shadow sm:rounded-md">
                <div class="px-4 py-5">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p class="block text-base font-medium text-gray-700">Chi nhánh</p>
                            <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" value={district} onChange={(e) => setDistrict(e.target.value)}>
                                <option value={-1}>Tất cả</option>
                                {selectDistricts()}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {listPitch.map((pitch) => {
                    return <ProductItem2 pitch={pitch} />
                })}
            </div>
        </>
    )
}

export default PitchManage;