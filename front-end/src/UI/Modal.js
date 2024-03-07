import React, { Children } from "react"
import styled, { keyframes } from "styled-components"

const Show = keyframes`
    from {
        opacity: 0.5;
        transform: translateY(-20%);
    }
    to {
        opacity: 1;
        transform: translateY(0%);
    }
`

const Container = styled.div`
    animation: ${Show};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
`

const Modal = ({ show, setShow, children }) => {
    const header = Children.map(children, child => child.type.displayName === 'Header' ? child : null)
    const body = Children.map(children, child => child.type.displayName === 'Body' ? child : null)
    const footer = Children.map(children, child => child.type.displayName === 'Footer' ? child : null)

    return (
        <>
            {show && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <Container className="relative w-full mx-5 my-6 lg:mx-auto max-w-3xl">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    { header }
                                </div>
                                <div className="relative p-6 flex-auto">
                                    { body }
                                </div>
                                { footer }
                            </div>
                        </Container>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>

    )
}

const Header = ({ children }) => children
Header.displayName = 'Header'
Modal.Header = Header

const Body = ({ children }) => children
Body.displayName = 'Body'
Modal.Body = Body

const Footer = ({ children }) => children
Footer.displayName = 'Footer'
Modal.Footer = Footer

export default Modal