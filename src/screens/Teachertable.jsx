import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import axios from "axios"
import { axiosUrl, jwt } from "../App"

const Teachertable = () => {
    const [teacher, setTeacher] = useState([])


    // get all teacher
    useEffect(() => {
        const getTeacher = async () => {
            try {
                const res = await axios.get(`${axiosUrl}/teacher`, {
                    headers:{
                        "Authorization":"Bearer "+jwt
                    }
                })
                console.log(res.data)
                setTeacher(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getTeacher()
    }, [])

    // delete teacher
    return (
        <div>
            <Sidebar />
            <div className='rightbar'>
                <Header />
                <div className="container-fluid my-5 table-scroll-react">
                    <h3>
                        O'qituvchilar ro'yxati
                    </h3>
                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ismi</th>
                                <th scope="col">Familyasi</th>
                                <th scope="col">Yo'nalishi</th>
                                <th scope="col">Telefon</th>
                                <th scope="col">Email</th>
                                <th scope="col">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teacher.map((item, count )=> {
                                    count = count + 1
                                    return (
                                        <tr key={item._id}>
                                            <th scope="row">{count}</th>
                                            <td>{item.name}</td>
                                            <td>{item.lastname}</td>
                                            <td>{item.category}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <Link to={`/singleteacher/${item._id}`} className='btn shadow-none btn-primary'>
                                                    <i className="fas fa-angle-double-right"></i>
                                                    <span className='px-1'>more</span>
                                                </Link>
                                                <button onClick={async () => {
                                                    try {
                                                        await axios.delete(`${axiosUrl}/teacher/${item._id}`, {
                                                            headers:{
                                                                "Authorization":"Bearer "+jwt
                                                            }
                                                        })
                                                        window.location.reload()
                                                    } catch (error) {
                                                        console.log(error)
                                                    }
                                                }} className='btn shadow-none btn-danger mx-2'>
                                                    <i className="fas fa-trash"></i>
                                                    <span className='px-1'>delete</span>
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

export default Teachertable;