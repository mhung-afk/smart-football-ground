import React from "react"
import { useLocation } from "react-router-dom"

export const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const convertDateToString = (Date, format = "mm/dd/yyyy") => {
    const date = String(Date.getDate()).padStart(2, '0')
    const month = String(Date.getMonth() + 1).padStart(2, '0')
    const year = Date.getFullYear()
    return format.replace("dd", date).replace("mm", month).replace("yyyy", year)
}

export const objectToQueryString = obj => new URLSearchParams(obj).toString()

export const getSrcFile = path => `${process.env.REACT_APP_API_URL}/${path}`

export const formatMoney = price => {
    price = parseInt(price)
    return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
}
