
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import OrderHistory from "./OrderHistory";
import Profile from "./Profile";
import MyMatch from "./MyMatch";
import SideBar from "../../components/SideBar";
import UpdateInfo from "./UpdateInfo";
import SharedMatch from "./SharedMatch";
import {IoMdPerson} from 'react-icons/io'
import {IoTicketSharp} from 'react-icons/io5'
import {GiSoccerField} from 'react-icons/gi'

let switchPath = [
    {
        path: "/ca-nhan/thong-tin",
        title: "Thông tin cá nhân",
        icon: <IoMdPerson size={20}/>
    },
    {
        path: "/ca-nhan/lich-su-dat-ve",
        title: "Lịch sử đặt sân",
        icon: <IoTicketSharp size={20}/>
    },
    {
        path: "/ca-nhan/cac-tran-dau-cua-toi",
        title: "Trận đấu của tôi",
        icon: <GiSoccerField size={20}/>
    }
]
const Personal = () => {
    const [showSidebar, setShowSidebar] = useState(true)
    
    return (
      <div className="relative min-h-screen md:flex">
          
          
          <SideBar type={2} switchPath={switchPath} showSidebar={showSidebar} setShowSidebar={setShowSidebar} path={window.location.pathname === "/ca-nhan" ? "/ca-nhan/thong-tin" : window.location.pathname} />
            <div className={`p-8 pt-12 w-full ${showSidebar? 'sm:ml-56':'sm:ml-12'}`}>
              <Switch>
                  <Route exact path="/ca-nhan/" component={Profile} />
                  <Route path="/ca-nhan/thong-tin/cap-nhat" component={UpdateInfo} />
                  <Route path="/ca-nhan/thong-tin" component={Profile} />
                  <Route path="/ca-nhan/lich-su-dat-ve" component={OrderHistory} />
                  <Route path="/ca-nhan/cac-tran-dau-cua-toi" component={MyMatch} />
                  <Route path="/ca-nhan/tran-dau/:matchInfoId" component={SharedMatch}/>

              </Switch>




              
          </div>
      </div>
  )
}
export default Personal;
