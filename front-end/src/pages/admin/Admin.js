import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import PitchManage from "./PitchManage";
import TicketManage from "./TicketManage";
import Statistical from "./Statistical";
import SideBar from "../../components/SideBar";
import AddPitch from "./AddPitch";
import EditPitch from './EditPitch'
import DeviceManage from "./DeviceManage";
import {IoTicketSharp} from 'react-icons/io5'
import {FcStatistics} from 'react-icons/fc'
import {GiSoccerField} from 'react-icons/gi'

let switchPath = [
    // {
    //     path: "/quan-ly/ca-nhan",
    //     title: "Thông tin cá nhân",
    //     icon: <IoMdPerson/>
    // },
    {
        path: "/quan-ly/thong-ke",
        title: "Thông tin thống kê",
        icon: <FcStatistics size={20}/>
    },
    {
        path: "/quan-ly/dat-ve",
        title: "Quản lý đặt vé",
        icon: <IoTicketSharp size={20}/>
    },
    {
        path: "/quan-ly/san-bong",
        title: "Quản lý sân bóng",
        icon: <GiSoccerField size={20}/>
    }
]
const Admin = () => {
    const [showSidebar, setShowSidebar] = useState(window.innerWidth>640)
    // const [activeSide, setActiveSide] = useState(window.location.pathname === "/quan-ly" ? "/quan-ly/thong-ke" : window.location.pathname)

    return (
        <div className="relative min-h-screen md:flex">
            <SideBar type={1} switchPath={switchPath} showSidebar={showSidebar} setShowSidebar={setShowSidebar} path={window.location.pathname === "/quan-ly" ? "/quan-ly/san-bong" : window.location.pathname} />
            <div className={`p-8 pt-12 w-full ${showSidebar ? 'sm:pl-64' : 'sm:pl-20'}`}>
                <Switch>
                    <Route exact path="/quan-ly/" component={PitchManage} />
                    <Route path="/quan-ly/thong-ke" component={Statistical} />
                    <Route path="/quan-ly/san-bong/them" component={AddPitch} />
                    <Route path="/quan-ly/san-bong/chinh-sua/:productId" component={EditPitch} />
                    <Route path="/quan-ly/san-bong" component={PitchManage} />
                    <Route path="/quan-ly/dat-ve" component={TicketManage} />
                    <Route path="/quan-ly/thiet-bi/:productId" component={DeviceManage} />
                </Switch>
            </div>
        </div>
    )
}

export default Admin;