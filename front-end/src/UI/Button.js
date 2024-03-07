import React from "react"
import { Link } from "react-router-dom"

/**
 * type: "button" | "link" | "submit"
 * text
 * to: for type link
 * styleStyle: 1 | 2 | 3
 * @returns 
 */
const Button = ({ widthFull = false, typeStyle = 1, customClass = "", type = "button", to = null, children, ...rest }) => {
    const width = widthFull ? " w-full" : ""
    const color = (typeStyle === 1) ? "text-white bg-amber-500 hover:bg-amber-600" : 
                (typeStyle === 2 ? "border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white" : 
                "bg-white text-amber-500 hover:bg-amber-500 hover:text-white tracking-wide px-6 py-3 border border-amber-500 outline-none") 
    const className = `rounded uppercase duration-200 cursor-pointer py-2 px-5 ${color}${width}${customClass ? " " + customClass : ""}`
    
    if(type === "link")
        return (
            <Link to={ to } className={ className } {...rest}>{ children }</Link>
        )
    else
        return (
            <button className={ className } type={ type } {...rest}>
                { children }
            </button>
        )
}

export default Button