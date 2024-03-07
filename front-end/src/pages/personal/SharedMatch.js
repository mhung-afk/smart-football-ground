import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
import { API_URL } from '../../utils/constant'
import { AuthContext } from "../../contexts/AuthContext"
import { BsFillCaretUpFill, BsFillCaretDownFill, BsFillCircleFill } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import Modal from '../../UI/Modal'
import { useHistory } from 'react-router-dom'

const SharedMatch = (props) => {
    const [inputCode, setInputCode] = useState('')

    const [editNameA, setEditNameA] = useState(false)
    const [editNameB, setEditNameB] = useState(false)

    const [nameA, setNameA] = useState('')
    const [nameB, setNameB] = useState('')
    const [scoreA, setScoreA] = useState(0)
    const [scoreB, setScoreB] = useState(0)

    const [access, setAccess] = useState(false)

    const [showModal, setShowModal] = useState(true)

    const { accessToken } = useContext(AuthContext)
    const history = useHistory()

    const checkEdit = async () => {
        // console.log(props.match.params.matchInfoId, inputCode.toUpperCase())
        try {
            await axios.post(`${API_URL}/match-info/sharing/check-can-edit`,
                {
                    matchId: props.match.params.matchInfoId,
                    code: inputCode.toUpperCase()
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )

            const res = await axios.get(`${API_URL}/match-info/${props.match.params.matchInfoId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })

            setShowModal(false)
            setAccess(true)
            const result = res.data.message.result
            // console.log(result)
            if (result[0].team) setNameA(result[0].team)
            if (result[0].point) setScoreA(result[0].point)
            if (result[1].team) setNameB(result[1].team)
            if (result[1].point) setScoreB(result[1].point)
        }
        catch (error) {
            const message = error.response.data.message
            alert(message)
            if (message == 'Can not edit match infomation this time')
                history.goBack()
        }
    }

    const edit = async () => {
        if (!access) return
        try {
            await axios.post(`${API_URL}/match-info/${props.match.params.matchInfoId}/edit`,
                {
                    teamA: nameA,
                    scoreA,
                    teamB: nameB,
                    scoreB
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
        }
        catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        edit()
    }, [scoreA, scoreB])

    return (
        <>
            {access ?
                <><p className="my-3 font-bold text-xl text-gray-700">Cập nhật tỉ số trận đấu #{props.match.params.matchInfoId}</p>
                    <div className='text-center sm:w-5/6 pt-2 m-auto bg-amber-400 rounded-md shadow-md'>
                        <p className='block text-xl font-semibold text-gray-700 my-3'>Tỉ số trận đấu</p>
                        <div className='grid grid-cols-5 gap-y-2'>
                            <div className='ml-auto mr-2 my-auto'>
                                <BsFillCaretUpFill size="25" className='hover:cursor-pointer' onClick={() => { setScoreA(scoreA + 1) }} />
                                <BsFillCaretDownFill size="25" className='hover:cursor-pointer' onClick={() => { if (scoreA > 0) setScoreA(scoreA - 1) }} />
                            </div>
                            <p className='text-6xl sm:text-9xl bg-gray-200 shadow-md rounded-md'>{scoreA}</p>
                            <div className='m-auto'>
                                <BsFillCircleFill className='mb-2 sm:mb-4' />
                                <BsFillCircleFill />
                            </div>
                            <p className='text-6xl sm:text-9xl bg-gray-200 shadow-md rounded-md'>{scoreB}</p>
                            <div className='mr-auto ml-2 my-auto'>
                                <BsFillCaretUpFill size="25" className='hover:cursor-pointer' onClick={() => { setScoreB(scoreB + 1) }} />
                                <BsFillCaretDownFill size="25" className='hover:cursor-pointer' onClick={() => { if (scoreB > 0) setScoreB(scoreB - 1) }} />
                            </div>

                            <FaEdit className='mr-2 my-auto ml-auto hover:cursor-pointer' size='22' onClick={() => setEditNameA(true)} />
                            {editNameA ?
                                <input type='text' className='px-3 sm:py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring' autoFocus value={nameA} onBlur={() => {
                                    edit()
                                    setEditNameA(false)
                                }} onChange={(e) => setNameA(e.target.value)} />
                                :
                                <p className='sm:py-2 text-2xl overflow-hidden'>{nameA}</p>
                            }

                            {editNameB ?
                                <input type='text' className='col-start-4 px-3 sm:py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring' autoFocus value={nameB} onBlur={() => {
                                    edit()
                                    setEditNameB(false)
                                }} onChange={(e) => setNameB(e.target.value)} />
                                :
                                <p className='sm:py-2 col-start-4 text-2xl overflow-hidden'>{nameB}</p>
                            }
                            <FaEdit className='ml-2 my-auto hover:cursor-pointer' size='22' onClick={() => setEditNameB(true)} />
                        </div>
                    </div>
                </>
                :
                <Modal show={showModal}>
                    <Modal.Header>
                        <p className='block text-lg font-medium text-gray-700'>Nhập mã bảo vệ</p>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='flex justify-center'>
                            <input type='text' maxLength='5' className='px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring' autoFocus value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
                            <button type="button" class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 mr-3 ml-10" onClick={history.goBack}>Quay lại</button>
                            <button type="button" class="font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-amber-500 hover:bg-amber-600" onClick={() => checkEdit()}>Xác nhận</button>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </>
    )

}

export default SharedMatch