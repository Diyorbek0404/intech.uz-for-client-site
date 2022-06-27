import axios from 'axios';
import React, { useRef } from 'react';
import { axiosUrl } from '../App';
import Sidebar from "../components/sidebar/Sidebar"

const Login = () => {
    const nameRef = useRef();
    const passwordRef = useRef();

    const loginForm = async () => {
        try {
            const res = await axios.post(`${axiosUrl}/auth/login`, {
                name: nameRef.current.value,
                password: passwordRef.current.value,
            })
            console.log(res.data)
            localStorage.setItem("jwt", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            // localStorage.setItem("user", JSON.stringify(res.data))
            window.location.replace("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Sidebar />
            <div className="rightbar">
                <div className="container-fluid my-5">
                    <div className="shadow p-3">
                        <h3 className='text-center'>Login</h3>
                        <div className='my-2'>
                            <label htmlFor="name">Name</label>
                            <input ref={nameRef} type="text" name="" id="name" className='form-control' />
                        </div>
                        <div className='my-2'>
                            <label htmlFor="name">Password</label>
                            <input ref={passwordRef} type="password" name="" id="name" className='form-control' />
                        </div>
                        <div className='my-2'>
                            <button onClick={loginForm} className='btn shadow-none btn-success'>login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;