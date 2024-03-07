import React from 'react'
import { useState, useEffect } from 'react';
import SideBarItem from './SideBarItem';
// import {IoMdPerson} from 'react-icons/io'


const SideBar = (props) => {
    const [activeSide, setActiveSide] = useState(props.path)
    return (
        <>
            {props.showSidebar ? (
                <svg class="h-8 w-8 flex mt-4 text-4xl text-orange-400 items-center cursor-pointer fixed left-2 z-30 hover:text-orange-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" onClick={() => props.setShowSidebar(!props.showSidebar)}>
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            ) : (
                <svg
                    onClick={() => props.setShowSidebar(!props.showSidebar)}
                    className="fixed mt-5 z-30 flex cursor-pointer left-2 hover:text-orange-400"
                    fill="rgb(251 146 60)"
                    viewBox="0 0 100 80"
                    width="30"
                    height="30"
                >
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            )}

            <div className={`left-0 w-52 py-7 fixed h-full z-10 translate-x-0 ease-in-out duration-300 ${props.showSidebar ? "" : "-translate-x-full sm:w-12 sm:translate-x-0"} bg-slate-300 shadow-md text-orange-500 w-56 space-y-6 transform transition`}>
                <div className='grid grid-cols-1 mt-10'>
                {props.showSidebar && props.type === 1 && (<p className="my-5 font-bold text-xl text-orange-500 text-center">Quản lý hệ thống</p>)}
                    {props.showSidebar && props.type === 2 && (<p className="my-5 font-bold text-xl text-orange-500 text-center">Quản lý người dùng</p>)}
                    {props.switchPath.map((item) => {
                        return SideBarItem({ show: props.showSidebar, path: item.path, title: item.title, icon: item.icon, isActive: (activeSide === item.path), onClick: () => { setActiveSide(item.path) } })
                    })}
                </div>
            </div>
        </>
    )
}

export default SideBar