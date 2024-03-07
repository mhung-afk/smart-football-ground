import React, { useEffect, useState } from "react"
import OtpInput from "react-otp-input"
import Button from "../UI/Button"
import Modal from "../UI/Modal"

const OtpInputDoor = ({ event, value = '12345' }) => {
    const [password, setPassword] = useState(value)
    const [showModal, setShowModal] = useState(false)
    
    const handleChange = password => setPassword(password)
    const click = async () => {
        setShowModal(true)
        if(event)
            await event(password)
    }

    useEffect(() => {
        setPassword(value)
    }, [value])
    return (
        <div className="bg-gray-300 rounded-lg p-4 flex justify-between space-x-6 w-max">
            <OtpInput
                value={password}
                onChange={handleChange}
                numInputs={5}
                separator={<span style={{ width: "8px" }}></span>}
                inputStyle={{border: "1px solid transparent", borderRadius: "8px", width: "54px", height: "54px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue"
                }}
                focusStyle={{
                border: "1px solid #CFD3DB",
                outline: "none"
                }}
            />
            <Button onClick={ click }>Đặt mật khẩu cửa</Button>
            <Modal show={ showModal } setShow={ setShowModal }>
                <Modal.Header>
                    <p className="text-green-500 text-2xl font-semibold">Thông báo</p>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <p>Đặt mật khẩu cửa thành công.</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default OtpInputDoor