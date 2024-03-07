import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../utils/constant";
import { AuthContext } from "../../contexts/AuthContext";
import { removeVI } from 'jsrmvi'
const listPos = require('../../assets/locationData.json')

const TicketManage = () => {
    const [district, setDistrict] = useState(-1)
    const [ward, setWard] = useState(-1)
    const [status, setStatus] = useState('')
    const [lstTickets, setLstTickets] = useState([])

    const [listDistricts, setListDistricts] = useState([])
    const [listWards, setListWards] = useState([])
    const [filter, setFilter] = useState('')
    const [reqParams, setReqParams] = useState('')

    const { accessToken } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`${API_URL}/products/districts`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => {
            setListDistricts(res.data.data)
        })
            .catch(err => alert(err))
    }, [])


    var selectDistricts = () => listPos.Districts.map((value, index) => {
        if (listDistricts.indexOf(value.Name) != -1)
            return <option value={index}>{value.Name}</option>
        return null
    })

    var selectWards = (district) => {
        if (district >= 0) {
            return listPos.Districts[district].Wards.map((value, index) => {
                if (listWards.indexOf(value.Name) != -1)
                    return <option value={index}>{value.Name}</option>
                return null
            })
        }
        return null
    }

    var getStatus = (status) => {
        if (status == 'pending')
            return 'Chưa thanh toán'
        else if (status == 'completed')
            return 'Đã thanh toán'
        return 'Đã hủy'
    }

    var getSlot = (slot, timeStart) => {
        for (var i in slot) {
            if (slot[i].timeStart == timeStart)
                return slot[i].timeEnd
        }
        return 'Error'
    }

    var cancelTickets = async () => {
        try {
            lstTickets.forEach( async (tic, index) => {
                if (tic.check) {
                    await axios.post(`${API_URL}/tickets/${tic._id}/edit`, { status: 'canceled' }, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })
                }
            })
            // console.log(reqParams)
            const res = await axios.get(`${API_URL}/tickets${reqParams}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            setLstTickets(res.data.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    var onChangeSel = (check, ticket) => {
        lstTickets.forEach(tic => {
            if (tic._id == ticket._id) tic.check = check
        })
    }

    function tableRow(value) {
        return (
            <tr key={value._id}>
                <td class="px-6 py-4 whitespace-nowrap text-blue-500">
                    <Link to="#">{`#${value._id.slice(18)}`}</Link>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{value.product_index_id.name}</div>
                    <div class="text-sm text-gray-500">{value.product_index_id.productId.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{value.code}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800"> {value.timeStart} - {getSlot(value.product_index_id.productId.slot, value.timeStart)} </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{value.username}</div>
                    <div class="text-sm text-gray-500">{value.user_phone}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value.dateStart.split('T')[0]}</td>
                <td class={`px-6 py-4 whitespace-nowrap text-base ${value.status == 'pending' ? 'text-green-500' : (value.status == 'completed' ? 'text-blue-600' : 'text-black')} `}>{getStatus(value.status)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-lg text-red-600">{value.price} VNĐ</td>
                <td>
                    <label class="inline-flex items-center px-6 py-3">
                        <input hidden={value.status == 'canceled'} checked={value.check} type="checkbox" class="form-checkbox h-5 w-5 bg-blue-600" onChange={(e) => onChangeSel(e.target.checked, value)} />
                    </label>
                </td>
            </tr>
        )
    }

    useEffect(() => {
        setWard(-1)
        if (district != -1) {
            axios.get(`${API_URL}/products/wards?district=${listPos.Districts[district].Name}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            }).then(res => {
                // console.log(res.data.data)
                setListWards(res.data.data)
            }).catch(err => alert(err))
        }
    }, [district])

    useEffect(() => {
        let reqParams = ''
        if (district >= 0) reqParams += `?district=${listPos.Districts[district].Name}`
        if (district >= 0 && ward >= 0) {
            if (reqParams == '')
                reqParams += '?'
            else reqParams += '&'
            reqParams += `ward=${listPos.Districts[district].Wards[ward].Name}`
        }
        if (status != '') {
            if (reqParams == '')
                reqParams += '?'
            else reqParams += '&'
            reqParams += `status=${status}`
        }
        axios.get(`${API_URL}/tickets${reqParams}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(res => {
                setLstTickets(res.data.data)
                setReqParams(reqParams)
            })
            .catch(err => {
                alert(err)
            })
    }, [district, ward, status])

    return (
        <>
            <p className="my-3 font-bold text-xl text-gray-700">Quản lý đặt vé</p>

            <div class="my-5 shadow sm:rounded-md">
                <div class="px-4 py-5">
                    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        <div>
                            <p class="block text-base font-medium text-gray-700">Quận</p>
                            <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" value={district} onChange={(e) => setDistrict(e.target.value)}>
                                <option value={-1}>Tất cả</option>
                                {selectDistricts()}
                            </select>
                        </div>
                        <div>
                            <p class="block text-base font-medium text-gray-700">Phường</p>
                            <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" value={ward} onChange={(e) => setWard(e.target.value)}>
                                <option value={-1}>Tất cả</option>
                                {selectWards(district)}
                            </select>
                        </div>
                        <div>
                            <p class="block text-base font-medium text-gray-700">Tình trạng</p>
                            <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value=''>Tất cả</option>
                                <option value='pending'>Chưa thanh toán</option>
                                <option value='completed'>Đã thanh toán</option>
                                <option value='canceled'>Đã hủy</option>
                            </select>
                        </div>
                        <div className="col-span-1 sm:col-span-3 mb-3 pt-0">
                            <p class="block text-base font-medium text-gray-700">Lọc thông tin</p>
                            <input type="text" placeholder="Nhập nội dung cần tìm" class="px-3 py-2 mt-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" onChange={(e) => setFilter(e.target.value)} />
                        </div>
                        <button type="button" class="w-4/5 sm:col-start-3 lg:col-start-6 py-2 border rounded-md shadow-sm text-base leading-4 font-medium text-white bg-amber-500 hover:bg-amber-600" onClick={() => cancelTickets()}>
                            Hủy vé
                        </button>
                    </div>
                </div>
            </div>

            <table class="m-auto w-full custom-screen:w-fit h-96 block overflow-scroll xl:overflow-auto text-center">
                <thead class="bg-amber-300 sticky top-0">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Mã vé</th>
                        <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Sân</th>
                        <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Mã sân</th>
                        <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Khung giờ</th>
                        <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Thông tin khách hàng</th>
                        <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày đặt vé</th>
                        <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Tình trạng vé</th>
                        <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                        <th class=""></th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-amber-300 pt-5">
                    {lstTickets.filter(value => removeVI('#' + value._id + value.product_index_id.name + value.product_index_id.productId.name + value.code + value.timeStart + '-' + getSlot(value.product_index_id.productId.slot, value.timeStart) + value.username + value.user_phone + value.dateStart.split('T')[0] + getStatus(value.status) + value.price + 'VNĐ', { replaceSpecialCharacters: false })?.replace(/\s/g, '').toLowerCase().search(filter?.replace(/\s/g, '').toLowerCase()) >= 0).map((value) => tableRow(value))}
                </tbody>
            </table>
        </>
    )
}

export default TicketManage;