import React from 'react';
import { Link } from 'react-router-dom';

const SideBarItem = (props) => {
    return (
        <Link to={props.path} onClick={props.onClick} className={`${props.show ? 'px-4' : 'text-center px-0'} py-2.5 transition duration-200 hover:bg-gray-400 ${props.isActive ? 'bg-slate-400' : 'bg-slate-300'}`}>
            <div className={`inline-block ${props.show ? 'pr-1' : ''} align-middle`}>{props.icon}</div>
            {props.show ?
                <span>{props.title}</span>
                :
                <></>
            }

        </Link>
    )
}

export default SideBarItem