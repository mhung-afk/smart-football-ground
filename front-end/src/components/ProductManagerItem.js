import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import io from "socket.io-client"
import Gauge from "../UI/Gauge"
import Switch from "../UI/Switch"
import OtpInputDoor from "./OtpInputDoor"
import { API_URL } from "../utils/constant"
import useAuthConfig from "../hooks/useAuthConfig"
import { Link } from "react-router-dom"

const ProductManagerItem = ({ data }) => {
    const [deviceData, setDeviceData] = useState(data.device)
    console.log(data.device)
    const authConfig = useAuthConfig()
    const socketRef = useRef()
    
    const sendRequestEvent = async (value, device) => {
        try {
            await axios.post(`${API_URL}/adafruit/create`, {
                device: device,
                value: value,
                productId: data.id
            }, authConfig)
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(() => {
        if(!socketRef.current) {
            socketRef.current = io.connect(process.env.REACT_APP_SOCKET_IO_URL)
        }

        socketRef.current.emit('add-session', data.id)
        socketRef.current.on('receive-data-device', dataGot => {
            setDeviceData(deviceData => {
                return {
                    ...deviceData, ...dataGot
                }
            })
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [])

    return (
        <div className="shadow-lg p-8">
            <Link to={`/san-bong/${data.id}`}
            className="text-3xl text-center font-semibold my-4 block hover:underline">{data.type}</Link>
            <div className="flex flex-wrap justify-center  my-2">
                <Switch title="LED" value={ deviceData.led }
                event={async value => await sendRequestEvent(value, 'led')} />
                <Switch title="PUMP" value={ deviceData.pump }
                event={async value => await sendRequestEvent(value, 'pump')} />
                <OtpInputDoor event={async value => await sendRequestEvent(value, 'door')} 
                value={ deviceData.door }/>
            </div>
            <div className="flex justify-center flex-wrap lg:space-x-2">
                <Gauge value={ deviceData.soilMoisture } units="%" label="Soil Moisture"/>
                <Gauge value={ deviceData.airTemperature } units="ºC" label="Temperature"/>
                <Gauge value={ deviceData.airHumidity } units="g/m³" label="Air Humidity"/>
                <div>
                    <p className="font-semibold text-center underline">Automatically</p>
                    <div>
                        <Switch title="LED" value={ deviceData.ledAutomatic }
                        event={async value => await sendRequestEvent(value, 'ledAutomatic')} />
                        <Switch title="PUMP" value={ deviceData.pumpAutomatic }
                        event={async value => await sendRequestEvent(value, 'pumpAutomatic')} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ProductManagerItem