import { sendRequest } from "./helper/client.js"
import dotenv from "dotenv"
dotenv.config()

const run = async () => {
    const headers = [
        'Content-Type: application/json',
        `X-AIO-Key: ${process.env.ADAFRUIT_TOKEN}`
    ]
    // const data = {value: 1}
    try {
        const response = await sendRequest(`${process.env.ADAFRUIT_URL}/${process.env.ADAFRUIT_NAME}/feeds/sas-led/data`, "GET", headers)
        let value = JSON.parse(response.data[0].value)
        value['asdasdasvdv'] = {led: 0}
        console.log(value)        
        
    } catch (error) {
        console.log(error)
    }
} 

run()