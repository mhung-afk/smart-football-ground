import React from "react";
import { Link } from "react-router-dom";
import { useContext , useState, useEffect} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { formatMoney } from "../../utils/helpers"
const OrderHistory = () => {
  const { accessToken } = useContext(AuthContext);
  const [ tickets, setTickets] = useState(null);
  let reqParams = ''
  const [status, setStatus] = useState('')
  const [time, setTime] = useState('')
  useEffect(() => {
    if (status != '') {
        if (reqParams == '')
            reqParams += '?'
        else reqParams += '&'
        reqParams += `status=${status}`
    }
    if (time != '') {
        if (reqParams == '')
            reqParams += '?'
        else reqParams += '&'
        reqParams += `time=${time}`
    }
        axios
          .get(`${API_URL}/user-info/ticket${reqParams}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((res) => {
            
            setTickets(res.data.data.resTickets);
          })},[status, time]
  );
  var getStatus = (status) =>{
    if(status=='pending')
        return 'Chưa thanh toán'
    else if(status=='completed')
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
    return (

      <>
      <p className="font-bold text-xl text-gray-700">Vé đã đặt</p>

      <div class="my-5 shadow sm:rounded-md">
          <div class="px-4 py-5">
              <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              <div>
                            <p class="block text-base font-medium text-gray-700">Tình trạng</p>
                            <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value=''>Tất cả</option>
                                <option value='pending'>Chưa thanh toán</option>
                                <option value='completed'>Đã thanh toán</option>
                                <option value='canceled'>Đã hủy</option>
                            </select>
                        </div>
                        <div>
                            <p class="block text-base font-medium text-gray-700">Thời gian</p>
                            <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base" value={time} onChange={(e) => setTime(e.target.value)}>
                                <option value=''>Tất cả</option>
                                <option value='newest'>Mới nhất</option>
                                <option value='oldest'>Cũ nhất</option>
                                
                            </select>
                        </div>
                  
              </div>
          </div>
      </div>


      {/* <table class="min-w-full divide-y divide-blue-600">
          <thead class="bg-blue-50"> */}
    <table class="m-auto w-full xl:w-fit h-96 block overflow-scroll text-center">
                <thead class="bg-amber-300 sticky top-0">

              <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">STT</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Mã vé</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sân</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Mã sân</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Khung giờ</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày đặt vé</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Người đại diện</th>
                  
                 
              </tr>
          </thead>

          <tbody class="bg-white divide-y divide-amber-300 pt-5">

              {
                  tickets && (tickets.reverse()).map((value, index) => {
                    return (
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {index+1}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-blue-500">
                                
                                <Link to="#">{`#${value._id.slice(18)}`}</Link>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm">{value.product_index_id.name}</div>
                    <div class="text-sm">{value.product_index_id.productId.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{value.code}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800"> {value.timeStart} - {getSlot(value.product_index_id.productId.slot, value.timeStart)} </span>
                </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {getStatus(value.status)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {value.createdAt.split('T')[0]}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {formatMoney(value.price)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {value.username}
                            </td>

                        </tr>
                    )
                })
              }
          </tbody>
      </table>
  </>
    );
}
export default OrderHistory;