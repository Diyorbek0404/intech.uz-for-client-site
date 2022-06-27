import React, { useEffect, useState } from 'react';
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header"
import axios from 'axios';
import { axiosUrl, jwt } from '../App';

const ComeHistory = () => {
    const [wascome, setWascome] = useState(Boolean)
    const [data, setData] = useState([])
    // const [dateSting, setDateSting] = useState(Date)


    const pathId = window.location.pathname.split("/")[2]
    console.log(pathId)
    const backWindowSite = () => {
        window.history.back()
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${axiosUrl}/student/${pathId}/come`, {
                    headers:{
                        "Authorization":"Bearer "+jwt
                    }
                })
                console.log(res.data)
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [pathId])

    // add come history
    const uploadComeHistory = async () => {
        const addcome = {
            wascome
        }
        try {
            const res = await axios.put(`${axiosUrl}/student/${pathId}/come`, addcome, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            });
            console.log(res.data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    let currentDate = new Date().getTimezoneOffset()
    console.log(currentDate)

    // data.forEach(item => {
    //     const data = item.date
    //     setDateSting(new Date(data).toLocaleDateString())
    // });
    const eafcef = () => {
        if (data.includes(currentDate)) {
            console.log("true")
        } else {
            console.log("false")
        }
        
    }

    return (
        <div>
            <Sidebar />
            <div className="rightbar" onClick={eafcef}>
                <Header />
                <button className='btn shadow-none' onClick={backWindowSite}>
                    <i className='fas fa-long-arrow-left fa-lg'></i>
                </button>
                <div className="container-fluid my-4">
                    <div className='my-5'>
                        <h5 className=''>Bugun kelganmi :</h5>
                        <div className='my-2'>
                            <button onClick={e => setWascome(true)} className='btn shadow-none btn-success'>
                                kelgan
                            </button>
                            <button onClick={e => setWascome(false)} className='btn shadow-none btn-danger mx-2'>
                                kelmagan
                            </button>
                        </div>
                        <button disabled={false} className='btn btn-primary' onClick={uploadComeHistory}>ok</button>
                    </div>

                    <h5>butun tarix:</h5>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">sana</th>
                                <th scope="col">kelgan && kelmagan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((come, count) => {
                                    count = count + 1
                                    return (
                                        <tr key={come._id}>
                                            <th scope="row">{count}</th>
                                            <td>{new Date(come.date).toLocaleDateString()}</td>
                                            <td>
                                                <button disabled className='btn shadow-none' style={{
                                                    backgroundColor: come.wascome ? "#198754" : "#dc3545",
                                                    color: "#fff"
                                                }}>
                                                    {come.wascome ? "kelgan" : "kelmagan"}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ComeHistory;