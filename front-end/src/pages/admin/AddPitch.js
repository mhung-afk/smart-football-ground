import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { API_URL } from "../../utils/constant"
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
const listPos = require('../../assets/locationData.json')

const AddPitch = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [ward, setWard] = useState(-1)
    const [district, setDistrict] = useState(-1)
    const [listPitch, setListPitch] = useState([''])
    const [timeSlot, setTimeSlot] = useState([{ timeStart: '5:00', timeEnd: '5:00', price: 0 }])
    const [image, setImage] = useState({})
    const history = useHistory()
    const {accessToken} = useContext(AuthContext)

    var listDistricts = listPos.Districts.map((value, index) => {
        return <option value={index}>{value.Name}</option>
    })

    var listWards = (district) => {
        if (district >= 0) {
            return listPos.Districts[district].Wards.map((value, index) => {
                return <option value={index}>{value.Name}</option>
            })
        }
        return null
    }

    useEffect(() => {
        setWard(-1)
    }, [district])

    const onHandleChange = (event) => {
        if (event.name == 'name') {
            setName(event.value)
        }
        else if (event.name == 'address') {
            setAddress(event.value)
        }
        else if (event.name == 'district') {
            setDistrict(event.value)
        }
        else if (event.name == 'ward') {
            setWard(event.value)
        }
        else if (event.name.includes('pitch')) {
            var idx = parseInt(event.name.slice(5))
            listPitch[idx] = event.value
        }
        else if (event.name.includes('timeStartHH')) {
            var idx = parseInt(event.name.slice(11))
            timeSlot[idx].timeStart = event.value + ':' + timeSlot[idx].timeStart.split(':')[1]
        }
        else if (event.name.includes('timeStartMM')) {
            var idx = parseInt(event.name.slice(11))
            timeSlot[idx].timeStart = timeSlot[idx].timeStart.split(':')[0] + ':' + event.value
        }
        else if (event.name.includes('timeEndHH')) {
            var idx = parseInt(event.name.slice(9))
            timeSlot[idx].timeEnd = event.value + ':' + timeSlot[idx].timeEnd.split(':')[1]
        }
        else if (event.name.includes('timeEndMM')) {
            var idx = parseInt(event.name.slice(9))
            timeSlot[idx].timeEnd = timeSlot[idx].timeEnd.split(':')[0] + ':' + event.value
        }
        else if (event.name.includes('price')) {
            var idx = parseInt(event.name.slice(5))
            timeSlot[idx].price = parseInt(event.value) * 1000
        }
        else if (event.name == 'image') {
            setImage(event.files[0])
        }
    }

    const onSubmit = () => {
        var fd = new FormData()
        if (image.name) fd.append('image', image)
        else return
        if (name.length > 0) fd.append('name', name)
        else return
        if (address.length > 0) fd.append('address', address)
        else return
        if (district >= 0) fd.append('district', listPos.Districts[district].Name)
        else return
        if (ward >= 0) fd.append('ward', listPos.Districts[district].Wards[ward].Name)
        else return
        if (timeSlot.length > 0) {
            fd.append(`slot`, JSON.stringify(timeSlot))
        }
        else return
        var tempLstPitch = listPitch.filter((value) => value.length > 0)
            .filter((value, index, self) => self.indexOf(value) == index)
        if(tempLstPitch.length==0){
            return
        }

        axios.post(`${API_URL}/products/create`, fd, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(res => {
                // console.log(res.data.data)
                for(var pitch in tempLstPitch){
                    axios.post(`${API_URL}/products/${res.data.data._id}/append`, {name: tempLstPitch[pitch]}, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })
                    // .then(res=>console.log(res))
                    .catch(err=>alert(err.response.data.message))
                }
                history.push('/quan-ly/san-bong')
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    return (
        <>
            <p className="my-3 font-bold text-xl text-gray-700">Thêm mới chi nhánh</p>
            <div class="shadow sm:rounded-md">
                <div class="px-4 py-5">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p class="block text-base font-medium text-gray-700">Tên chi nhánh</p>
                            <input name="name" onChange={(e) => onHandleChange(e.target)} type="text" placeholder="Nhập tên chi nhánh" class="px-3 py-2 mt-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                        </div>
                        <div>
                            <p class="block text-base font-medium text-gray-700">Địa chỉ</p>
                            <input name="address" onChange={(e) => onHandleChange(e.target)} type="text" placeholder="Nhập số nhà, đường" class="px-3 py-2 mt-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                        </div>
                        <div>
                            <p class="block text-base font-medium text-gray-700">Quận</p>
                            <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" name="district" value={district} onChange={(e) => onHandleChange(e.target)}>
                                <option value={-1}>-- Chọn quận --</option>
                                {listDistricts}
                            </select>
                        </div>
                        <div>
                            <p class="block text-base font-medium text-gray-700">Phường</p>
                            <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" name="ward" value={ward} onChange={(e) => onHandleChange(e.target)}>
                                <option value={-1}>-- Chọn phường --</option>
                                {listWards(district)}
                            </select>
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <p class="block text-base font-medium text-gray-700">Thêm ảnh</p>
                            <div class="flex items-center bg-grey-lighter">
                                <label class="w-32 md:w-40 flex flex-col items-center px-3 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-amber-600 hover:text-white">
                                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                    </svg>
                                    <span class="mt-2 text-base leading-normal">Chọn 1 ảnh</span>
                                    <input name="image" onChange={(e) => onHandleChange(e.target)} type='file' class="hidden" accept="image/*" />
                                </label>
                                <p class="mt-2 ml-4 text-base leading-normal">{image.name}</p>
                            </div>
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <p class="block text-base font-medium text-gray-700">Thêm sân</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {listPitch.map((pitch, index) => {
                                    return (
                                        <div className="flex">
                                            <input name={`pitch${index}`} onChange={(e) => onHandleChange(e.target)} type="text" placeholder={`Nhập tên sân ${index + 1}`} class="px-3 py-2 mt-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-3/5 inline-block" />
                                            <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-3 rounded items-center align-middle inline-block" onClick={() => {
                                                if (listPitch.length === 1) return;
                                                const values = [...listPitch];
                                                values.splice(index, 1);
                                                setListPitch(values)
                                            }}>
                                                <svg class="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                            <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 rounded items-center align-middle inline-block"
                                                onClick={() => {
                                                    setListPitch([...listPitch, ''])
                                                }
                                                }>
                                                <svg class="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <table class="m-auto w-full xl:w-fit block overflow-x-scroll sm:overflow-x-auto text-center col-span-1 sm:col-span-2">
                            <thead class="bg-amber-300 text-center">
                                <tr>
                                    <th>
                                        <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 rounded items-center align-middle inline-block"
                                            onClick={() => setTimeSlot([...timeSlot, { timeStart: '5:00', timeEnd: '5:00', price: 0 }])}>
                                            <svg class="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Khung giờ</th>
                                    <th scope="col" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Giá vé</th>
                                </tr>
                            </thead>
                            <tbody class="text-center bg-white divide-y divide-amber-300 pt-5">
                                {timeSlot.map((slot, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <button class="px-6 py-3 whitespace-nowrap bg-grey-light hover:bg-grey text-grey-darkest font-bold rounded items-center align-middle inline-block" onClick={() => {
                                                    if (timeSlot.length === 1) return;
                                                    var values = [...timeSlot];
                                                    values.splice(index, 1);
                                                    setTimeSlot(values);
                                                }}>
                                                    <svg class="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            </td>
                                            <td class="px-6 py-3 whitespace-nowrap flex">
                                                <div class="px-2 bg-white rounded-lg border border-gray-600 w-fit">
                                                    <select name={`timeStartHH${index}`} onChange={(e) => onHandleChange(e.target)} class="bg-transparent text-xm appearance-none outline-none">
                                                        <option value="5">05</option>
                                                        <option value="6">06</option>
                                                        <option value="7">07</option>
                                                        <option value="8">08</option>
                                                        <option value="9">09</option>
                                                        <option value="10">10</option>
                                                        <option value="11">10</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                        <option value="21">21</option>
                                                        <option value="22">22</option>
                                                    </select>
                                                    <span class="mt-0.5 mr-3">:</span>
                                                    <select name={`timeStartMM${index}`} onChange={(e) => onHandleChange(e.target)} class="bg-transparent text-xm appearance-none outline-none mr-2">
                                                        <option value="00">00</option>
                                                        <option value="30">30</option>
                                                    </select>
                                                </div>
                                                <span class="mx-2">đến</span>
                                                <div class="px-2 bg-white rounded-lg border border-gray-600 w-fit">
                                                    <select name={`timeEndHH${index}`} onChange={(e) => onHandleChange(e.target)} class="bg-transparent text-xm appearance-none outline-none">
                                                        <option value="5">05</option>
                                                        <option value="6">06</option>
                                                        <option value="7">07</option>
                                                        <option value="8">08</option>
                                                        <option value="9">09</option>
                                                        <option value="10">10</option>
                                                        <option value="11">10</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                        <option value="21">21</option>
                                                        <option value="22">22</option>
                                                    </select>
                                                    <span class="text-base mt-0.5 mr-3">:</span>
                                                    <select name={`timeEndMM${index}`} onChange={(e) => onHandleChange(e.target)} class="bg-transparent text-xm appearance-none outline-none mr-2">
                                                        <option value="0">00</option>
                                                        <option value="30">30</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td class="px-6 py-3 whitespace-nowrap overflow-hidden">
                                                <input name={`price${index}`} onChange={(e) => onHandleChange(e.target)} min="0" type="number" class="px-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-right text-xm border border-gray-600 outline-none focus:outline-none focus:ring w-1/2" />
                                                <span class="ml-2 text-gray-700">.000 VNĐ</span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="col-span-1 sm:col-span-2 text-center">
                            <button type="button" class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={()=>history.push('/quan-ly/san-bong')}>Hủy</button>
                            <button type="button" class="font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-white bg-amber-500 hover:bg-amber-600" onClick={() => { onSubmit() }}>Thêm mới</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPitch