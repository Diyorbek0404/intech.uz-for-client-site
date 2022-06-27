import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import axios from "axios"
import { axiosUrl, jwt } from "../App"
import { Link } from 'react-router-dom';

const Student = () => {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("");


    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`${axiosUrl}/student?searchquery=${query}`, {
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
        if (query.length === 0 || query.length > 2) fetchStudent();
    }, [query])
    return (
        <div>
            <Sidebar />
            <div className='rightbar'>
                <Header />
                <div className="container-fluid my-5">
                    <div className="shadow p-3">
                        <h5>barcha o'quvchilar - {data.length} ta</h5>
                        {/* <ul className="list-group my-2">
                            <li className="list-group-item">ingliz tili -10</li>
                            <li className="list-group-item">ona tili - 20</li>
                            <li className="list-group-item">koreys tili - 30</li>
                        </ul> */}
                        <div className="row">
                            <div className='col-lg-6 col-sm-12'>
                                <input
                                    type="text"
                                    placeholder="o'quvchilarni izlash"
                                    className=' form-control my-2'
                                    name=""
                                    id=""
                                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                                />
                            </div>
                        </div>
                        <div className='table-scroll-react'>
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ismi</th>
                                        <th scope="col">familyasi</th>
                                        <th scope="col">yo'nalishi</th>
                                        <th scope="col">qancha to'laydi</th>
                                        <th scope="col">o'qituvchi</th>
                                        <th scope="col">to'lovlar tarixi</th>
                                        <th scope="col">kelganlik tarixi</th>
                                        <th scope="col">amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((student, count) => {
                                            count = count + 1
                                            return (
                                                <tr key={student._id}>
                                                    <th scope="row">{count}</th>
                                                    <td>{student.name}</td>
                                                    <td>{student.lastname}</td>
                                                    <td>{student.category}</td>
                                                    <td>{student.pay}</td>
                                                    <td>{student.teacher}</td>
                                                    <td>
                                                        <Link to={`/payhistory/${student._id}/?queryf=`} className='btn shadow-none btn-outline-primary'>Tarixi</Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/comehistory/${student._id}`} className='btn shadow-none btn-outline-primary'>Tarixi</Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/singlestudent/${student._id}`} className='btn shadow-none btn-outline-success'>ko'proq</Link>
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
            </div>
        </div>
    );
};

export default Student;