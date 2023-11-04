import React, { memo, useEffect, useState } from 'react'
import './user.scss'
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import apis from '@/services/apis';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { userAction } from '@/stores/slices/user.slice';
import { User } from 'firebase/auth';
import { googleLogin } from '@/firebase';

interface UserGoogle extends User {
    accessToken: string
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userStore = useSelector((store: StoreType) => store.userStore);
    const [, setIsLoading] = useState(false);

    function handleSignIn(e: React.FormEvent) {
        e.preventDefault();
        console.log("e", e)
        setIsLoading(true);

        let user = {
            userNameOrEmail: (e.target as any).userNameOrEmail.value,
            password: (e.target as any).password.value
        }

        apis.userApi.login(user)
            .then(res => {
                if (res.status == 200) {
                    setIsLoading(false);
                    message.success("Login thành công");
                    localStorage.setItem("token", res.data.token);
                    console.log("ressss111", res, userAction);
                    dispatch(userAction.reload());
                } else {
                    message.warning(res.data.message)
                }
            })
            .catch(err => {
                if (Array.isArray(err.response.data.message)) {
                    for (let i in err.response.data.message) {
                        message.warning(err.response.data.message[i])
                    }
                    setIsLoading(false);
                } else {
                    message.warning(err.response.data.message);
                    setIsLoading(false);
                }

            })
    }
    useEffect(() => {
        if (userStore.data) {
            navigate("/")
        }
    }, [userStore.data])
    // useEffect(() => {
    //     if (userStore.data) {
    //         navigate("/")
    //     }
    // }, [userStore.data])

    // async function handleLogin(e: React.FormEvent) {
    //     e.preventDefault();
    //     let data = {
    //         userNameOrEmail: (e.target as any).userNameOrEmail.value,
    //         password: (e.target as any).password.value
    //     }
    //     await apis.userApi.login(data)
    //         .then(res => {
    //             console.log("res", res)
    //             if (res.status == 200) {
    //                 localStorage.setItem("token", res.data.token)
    //             }
    //         })
    //         .catch(err => {
    //             console.log("err", err)
    //         })
    // }
    async function handleGoogleLogin() {
        try {
            const res = await googleLogin();
            console.log("res", res);

            if (res.user) {
                const data = {
                    accessToken: (res.user as UserGoogle).accessToken,
                    email: res.user.email,
                    userName: res.user.displayName,
                    password: res.user.uid,
                    // firstName: res.user.displayName,
                    // lastName: res.user.displayName
                };

                const apiResponse = await apis.userApi.googleLogin(data);
                console.log("apiResponse", apiResponse);

                if (apiResponse.status === 200) {
                    localStorage.setItem("token", apiResponse.data.token);
                    dispatch(userAction.reload());
                } else {
                    window.alert("Đăng nhập Google thất bại");
                }
            } else {
                window.alert("Đăng nhập Google thất bại");
            }
        } catch (err) {
            console.log("err", err);
            window.alert("Đăng nhập Google thất bại, vui lòng thử lại!");
        }
    }


    // apis.userApi.login(user)
    //     .then(res => {
    //         if (res.status == 200) {
    //             setIsLoading(false);
    //             message.success("Login thành công");
    //             localStorage.setItem("token", res.data.token);
    //             console.log("ressss111", res, userAction);
    //             dispatch(userAction.reload());
    //         } else {
    //             message.warning(res.data.message)
    //         }
    //     })
    //     .catch(err => {
    //         if (Array.isArray(err.response.data.message)) {
    //             for (let i in err.response.data.message) {
    //                 message.warning(err.response.data.message[i])
    //             }
    //             setIsLoading(false);
    //         } else {
    //             message.warning(err.response.data.message);
    //             setIsLoading(false);
    //         }

    //     })





    return (
        <section className='form-main'>
            <div className='form-content'>
                <div className='box'>
                    <h3>WelCome</h3>
                    {/* <div >Email</div> */}
                    <a className="social" onClick={() => {
                        handleGoogleLogin()
                    }}>
                        <i className="fab fa-google-plus-g"/>
                    </a>
                    <form action="" onSubmit={(e) => {
                        handleSignIn(e)
                    }}>
                        <div className='input-box'>
                            <input type="text" placeholder='UserName Or Email' className='input-control' name='userNameOrEmail' />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' className='input-control' name='password' />

                            <div className='input-link'>
                                <Link to='/reset-password' className='gradient-text'>Forgot Password ?</Link>

                            </div>
                        </div>
                        <button type='submit' className='btn'>Log in</button>
                    </form>

                    <p>Don't have an account ? <Link to='/register' className='gradient-text'>Sign Up</Link></p>

                </div>
            </div>

        </section>
    )
}
export default memo(Login)