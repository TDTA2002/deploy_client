import { useState } from 'react'
import './footer.scss'
import logo from '@/images/logo.svg';
import { Modal } from 'antd';
import Chatbox from '@/pages/chatbox/Chatbox';

export default function Footer() {
    const [openChat, setOpenChat] = useState(false);

    return (


        <>
            {
                openChat == false
                    ? <a onClick={() => {
                        Modal.confirm({
                            content: "Mở khung chat với tài khoản của bạn?",
                            onOk: () => {
                                setOpenChat(true)
                            }
                        })
                    }} style={{ position: "fixed", right: "50px", bottom: "50px" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                        </svg></a>
                    : <div style={{ width: "400px", position: "fixed", right: 0, bottom: 0, zIndex: 9999 }}>
                        <Chatbox open={openChat} setOpenChat={setOpenChat} />
                    </div>
            }

            <footer className="footer">
                <section className="section grid footer-container ">
                    <div className="hr-line"></div>
                    <div className="footer-content">
                        <div className="left-footer">
                            <div className="logo-footer">
                                <img
                                    className="footer-icon"
                                    src={logo}
                                    alt="logo do PlayStation"
                                />
                                <h2 className="logo-titulo">PlayStation</h2>
                                <p className="footer-description">
                                    Welcome to PlayStation Plus. Enhance your PlayStation experience
                                    with online multiplayer, monthly games, exclusive discounts and
                                    more.
                                </p>
                            </div>
                            <div className="social">
                                <a href="" target="_blank">
                                    <i className="uil uil-github" />
                                </a>
                                <a href="" target="_blank">
                                    <i className="uil uil-linkedin-alt" />
                                </a>
                                <a href="#">
                                    <i className="uil uil-instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="right-footer">
                            <div className="services">
                                <h4 className="footer-h4">Services</h4>
                                <a className="footer-a" href="products">
                                    Products
                                </a>
                            </div>
                            <div className="company">
                                <h4 className="footer-h4">Company</h4>
                                <a className="footer-a" href="/">
                                    Home
                                </a>
                                <a className="footer-a" href="">
                                    About
                                </a>
                                <a className="footer-a" href="#faq">
                                    FaQs
                                </a>
                            </div>
                            <div className="suport">
                                <h4 className="footer-h4">Suport</h4>
                                <a className="footer-a" href="">
                                    Terms of Service
                                </a>
                                <a className="footer-a" href="">
                                    Privacy Policy
                                </a>
                                <a className="footer-a" href="">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hr-line" />
                    <p className="copy">Copyright 2022 Playstation - All Rights Rleserved</p>
                </section>
            </footer>
        </>

    )
}
