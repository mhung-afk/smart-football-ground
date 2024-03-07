import React, { useEffect, useState } from "react"

const Switch = ({ event, title, value }) => {
    const [off, setOff] = useState(!value)
    const bulletToggleClass = !off ? "" : " transform translate-x-10"
    const bgToggleClass = !off ? " bg-green-700" : " bg-red-700"

    const click = async () => {
        try {
            let newOff = !off
            if(event)
                await event(newOff ? '0' : '1')
            setOff(newOff)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-min flex items-center py-4 px-10 rounded-lg">
            <p className="font-semibold w-14">{title}</p>
            <div className={"relative w-20 h-10 flex items-center rounded-full p-1 cursor-pointer" + bgToggleClass}
            onClick={click}>
                <span className="absolute left-2">ON</span>
                <span className="absolute right-2">OFF</span>
                <div className={"bg-black w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out" + bulletToggleClass}
                ></div>
            </div>
        </div>
    )
}

export default Switch