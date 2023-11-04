import React, { useState } from 'react'
import './user.scss'
import apis from '@/services/apis';
import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export default function Register() {
    const [load, setLoad] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        let data = {
            email: (e.target as any).email.value,
            firstName: (e.target as any).firstName.value,
            lastName: (e.target as any).lastName.value,
            userName: (e.target as any).userName.value,
            password: (e.target as any).password.value
        }
        await apis.userApi.register(data)
            .then(res => {
                if (res.status != 200) {
                    Modal.confirm({
                        content: res.data.message,
                        okText: "thử lại"
                    })
                } else {
                    Modal.success({
                        content: res.data.message,
                        okText: "login"
                    })
                }
            })
            .catch(_err => {
                Modal.success({
                    content: "Sập server!",
                    okText: "thử lại"
                })
            })

        setLoad(false)
    }

    return (
        <section className='form-main'>
            <div className='form-content'>
                <div className='box'>
                    <h3>WelCome</h3>
                    <form action="" onSubmit={(e) => {
                        handleRegister(e)
                    }}>
                        <div className='input-box' style={{ display: 'flex', gap: "10px" }}>
                            <input type="text" placeholder='First name' className='input-control' name='firstName' />
                            <input type="text" placeholder='Last name' className='input-control' name='lastName' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='User name' className='input-control' name='userName' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='Email' className='input-control' name='email' />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' className='input-control' name='password' />
                        </div>
                        <div className='input-link'>
                            <Link to='/reset-password' className='gradient-text'>Forgot Password ?</Link>
                        </div>
                        <button
                            type="submit"
                            className={`${load && 'active'} btn`}
                        >
                            Create an account
                            <div className='btn_loading'>
                                <Spin indicator={antIcon} />
                            </div>
                        </button>
                    </form>
                    <p>Don't have an account ? <Link to='/login' className='gradient-text'>Sign Up</Link></p>

                </div>
            </div>
        </section>
    )
}
