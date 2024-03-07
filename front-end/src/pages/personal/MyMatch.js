import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";
const MyMatch = () => {
  const { accessToken } = useContext(AuthContext);
  const [matchs, setMatchs] = useState(null);
  const [matchId, setMatchId] = useState("");
  const [msg, setmsg] = useState("");
  function getEnd(value) {
    
    return parseInt(value) + 1 + ":00";
  }
  const onHandleChange = (event) => {
    setMatchId(event.value);
  };
  const AddSharingMatch = (event) => {
    event.preventDefault();
    if (matchId==""){
      setmsg("Vui lòng điền thông tin")
      
    }
    else{
    try {
      axios
        .post(
          `${API_URL}/match-info/sharing/append`,
          { matchId: matchId },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((res) => {
          setmsg("Thêm trận bóng được chia sẻ thành công");
        })
        .catch((error) => {
          setmsg("Mã trận đấu không chính xác hoặc đã được chia sẻ")
          
        });
    } catch (error) {
      setmsg("Error")
      
    }
  };
}
  useEffect(() => {
    axios
      .get(`${API_URL}/match-info/sharing/get`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        var temp = [];
        for (var i = 0; i < res.data.message.share.length; i++) {
          temp.push([res.data.message.share[i], res.data.message.tickets[i]]);
        }
        setMatchs(temp);
      });
  }, []);
  return (
    <>
      <form>
        <div class="mb-6 flex flex-wrap justify-center">
          <input
            onChange={(e) => onHandleChange(e.target)}
            type="email"
            id="email"
            class="border border-gray-300 text-sm rounded-lg focus:border-blue-500 block p-2.5 mt-3"
            placeholder="Nhập mã trận đấu được chia sẻ"
          />
          <button
            onClick={AddSharingMatch}
            type="button"
            class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-5 py-2.5 text-center bg-amber-500 hover:bg-amber-600 ml-3 mt-3"
          > 
            Xác nhận
          </button>
          {/* <button type="button" class="font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-white bg-amber-500 hover:bg-amber-600" onClick={() => {AddSharingMatch()}}>Xác nhận</button> */}
        </div>
        <div class="pb-3 flex flex-wrap justify-center">{msg}</div>
      </form>
      <div class="pt-6"></div>
      <div className="flex flex-wrap justify-center">
      <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {matchs &&
          matchs.map((match) => (

            <Link to={`/ca-nhan/tran-dau/${match[0]._id}`}>
            <div class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-100 hover:bg-slate-500 duration-300 max-w-sm bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-400 dark:border-gray-700">

              
              <div class="p-5 pr-6">
                
                  <p><strong>
                  Trận đấu: {(match[0]._id).toString()}
                  </strong>
                  </p>
                
                <p>
                  Sân: {match[1].product_index_id.name} -{" "}
                  {match[1].product_index_id.productId.name}
                </p>
                <td class="whitespace-nowrap pt-3">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {" "}
                    {match[1].timeStart} - {getEnd(match[1].timeStart)} :{" "}
                    {match[1].dateStart.split("T")[0]}
                  </span>
                </td>
                <div class="pt-2"></div>
                <td class="whitespace-nowrap">
                {match[0].result[0].point != null && (<span class="px-10 inline-flex text-xs leading-10 font-semibold rounded-full bg-green-100 text-red-800">
                    {match[0].result[0].team} : {match[0].result[0].point}
                  </span>)}
                  {match[0].result[0].point == null && (<span class="px-10 inline-flex text-xs leading-10 font-semibold rounded-full bg-green-100 text-red-800">
                    {match[0].result[0].team} : __
                  </span>)}
                </td>

                <td class="whitespace-nowrap pt-3 pl-3">
                {match[0].result[1].point != null && (<span class="px-10 inline-flex text-xs leading-10 font-semibold rounded-full bg-green-100 text-red-800">
                    {match[0].result[1].team} : {match[0].result[1].point}
                  </span>)}
                  {match[0].result[1].point == null && (<span class="px-10 inline-flex text-xs leading-10 font-semibold rounded-full bg-green-100 text-red-800">
                    {match[0].result[1].team} : __
                  </span>)}
                </td>
                
              </div>
            </div>
            </Link>
          ))}
          </div>
      </div>
    </>
  );
};
export default MyMatch;
