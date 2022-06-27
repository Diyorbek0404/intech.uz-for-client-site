import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import axios from "axios"
import { axiosUrl, jwt } from "../App"

const Home = () => {
    const [categoryadd, setCategoryadd] = useState("")
    const [category, setCategory] = useState([])

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`${axiosUrl}/category`, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                })
                setCategory(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPost()
    }, [])

    const uploadCategory = async () => {
        const newCategory = {
            name: categoryadd
        }
        try {
            const res = await axios.post(`${axiosUrl}/category`, newCategory, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            })
            window.location.reload()
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Sidebar />
            <div className='rightbar'>
                <Header />
                <div className="container-fluid my-4">
                    <div className="shadow p-3">
                        <div className="row">
                            <h5>kategoriyalar</h5>
                            <div className="col-md-6 col-sm-12">
                                <label htmlFor="kurs">kategoriyalar qo'shish (kurs nomi):</label>
                                <input value={categoryadd} onChange={e => setCategoryadd(e.target.value)} className='form-control' type="text" id='kurs' />
                                <button onClick={uploadCategory} className='btn shadow-none btn-success my-1'>qo'shish</button>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <p>
                                    kategoriyalar ro'yxati
                                </p>
                                <ul className="list-group">
                                    {
                                        category.map(item => {
                                            return (
                                                <li key={item._id} className="list-group-item">{item.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>


                </div>
                <h1 className='my-5 text-center'>Dashboard qo'shish <br />
                    to'lovlar qismini yaxshilash</h1>
            </div>
        </div>
    );
};

export default Home;