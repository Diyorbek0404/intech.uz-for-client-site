import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { axiosUrl, jwt } from '../App';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const SingleNews = () => {
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState({})
    const [title, setTitle] = useState('')
    const [description, setDesription] = useState('')
    const pathId = window.location.pathname.split("/")[2]
    const backWindowSite = () => {
        window.history.back()
    }

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${axiosUrl}/news/${pathId}`, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
            setData(res.data)
            setTitle(res.data.title)
            setDesription(res.data.description)
        }
        getData()
    }, [pathId])

    async function updateCourse() {
        const updatedTeacher = {
            title,
            description,
        }
        try {
            const res = await axios.put(`${axiosUrl}/news/${pathId}`, updatedTeacher, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            })
            console.log(res.data)
            setEdit(false)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Sidebar />
            <div className="rightbar">
                <Header />
                <button className='btn shadow-none' onClick={backWindowSite}>
                    <i className='fas fa-long-arrow-left fa-lg'></i>
                </button>
                <div className="container-fluid">
                    <div className="shadow p-3" style={{
                        borderRadius: "10px"
                    }}>
                        <div>
                            {
                                edit ?
                                    null
                                    :
                                    <button onClick={e => setEdit(true)} className='btn shadow-none btn-primary'>tahrirlash</button>
                            }
                        </div>
                        <div className="card">
                            <img src={data.photo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                {
                                    edit ?
                                       <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                                        :
                                        <h5 className="card-title">
                                            {data.title} kursi
                                        </h5>
                                }

                                <p className="card-text">
                                    {
                                        edit ?
                                            <textarea value={description} onChange={e => setDesription(e.target.value)} className='my-2' />
                                            :
                                            data.description
                                    }
                                </p>
                                {
                                    edit ?
                                        <button onClick={updateCourse} className='btn shadow-none btn-success'>Yangilash</button>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleNews;