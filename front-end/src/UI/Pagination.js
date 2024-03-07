import React from "react"
import { Link } from "react-router-dom"
import { AngleLeft, AngleRight } from "../utils/constant"

const PaginationItem = ({ children, to, disabled = false }) => {
    const disabledClass = disabled ? " select-none pointer-events-none" : ""
    return (
        <Link to={ to }
        className={`rounded-md border-gray-300 border py-2 px-4 mx-2 hover:border-blue-800 duration-300${disabledClass}`}>
            { children }
        </Link>
    )
}

const Pagination = ({next, previous, disabled = false}) => {
    return (
        <>
            <PaginationItem to={previous} disabled={disabled}>
                <AngleLeft fill="#959DA3" width="10px" className="inline"/>
                <span className="text-gray-600 mx-1 text-base hidden sm:inline">Trang trước</span>
            </PaginationItem>
            <PaginationItem to={next}>
                <span className="text-gray-600 mx-1 text-base hidden sm:inline">Trang sau</span>
                <AngleRight fill="#959DA3" width="10px" className="inline"/>
            </PaginationItem>
        </>
    )
}

export default Pagination