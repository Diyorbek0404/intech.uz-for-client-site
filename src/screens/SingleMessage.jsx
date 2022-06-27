import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { axiosUrl, jwt } from '../App';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const SingleMessage = () => {

    const backWindowSite = () => {
        window.history.back()
    }

    const pathId = window.location.pathname.split("/")[2]
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await axios.get(`${axiosUrl}/messages/${pathId}`, {
                    headers:{
                        "Authorization":"Bearer "+jwt
                    }
                })
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessage()
    }, [pathId])

    return (
        <div>
            <Sidebar />
            <div className='rightbar'>
                <Header />
                <button className='btn shadow-none' onClick={backWindowSite}>
                    <i className='fas fa-long-arrow-left fa-lg'></i>
                </button>
                <div className="container my-5">
                    <div className="shadow p-3">
                        <span style={{
                            fontWeight: "600"
                        }}>Xabar kelgan vaqt:</span> {new Date(data.createdAt).toLocaleString()}

                        <h6 className='my-2'>Kimdan: </h6>
                        <span>
                            {data.name} {data.lastname}
                        </span>
                        <h6 style={{
                            marginTop: "10px"
                        }}>
                            Telefon raqami:
                        </h6>
                        <span>{data.phone}</span>

                        <h6 style={{
                            marginTop: "10px"
                        }}>Xabarning to'liq matni</h6>
                        <p>
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMessage;