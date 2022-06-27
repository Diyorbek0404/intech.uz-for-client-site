import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { axiosUrl, jwt } from '../App';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const CourseSingle = () => {
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState({})
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [studentnumber, setStudentNumber] = useState('')
    const [categoryArr, setCategoryArr] = useState([])
    // const [category, setCategory] = useState('')
    const [description, setDesription] = useState('')
    const pathId = window.location.pathname.split("/")[2]
    const backWindowSite = () => {
        window.history.back()
    }

    useEffect(() => {
        const getData = async () => {
            let reqTeacher = axios.get(`${axiosUrl}/course/${pathId}`, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });

            let resCategory = await axios.get(`${axiosUrl}/category/`, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            })
            axios.all([reqTeacher, resCategory]).then(axios.spread((...res) => {
                // const allCategory = res[0].data;
                // const allTeacher = res[1].data;
                setData(res[0].data)
                setDesription(res[0].data.description)
                setName(res[0].data.name)
                setCategoryArr(res[1].data)
                setPrice(res[0].data.price)
                setStudentNumber(res[0].data.studentnumber)
                // setName(res[1].data.name)
                // setLastName(res[1].data.lastname)
                // setCategory(res[1].data.category)
                // setData(res[1].data)
                // console.log(res[1].data)
                // setPhone(res[1].data.phone)
                // setEmail(res[1].data.email)
                // console.log(res[0])
                // setStudent(res[0].data)
                // setStudentLenght(res[0].data.length)
            }))
        }
        getData()
    }, [pathId])

    async function updateCourse() {
        const updatedTeacher = {
            name,
            price,
            description,
            studentnumber
        }
        try {
            const res = await axios.put(`${axiosUrl}/course/${pathId}`, updatedTeacher, {
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
                                        <select value={name} onChange={e=> setName(e.target.value)} name="" id="">
                                            <option value={"tanlang"}>tanlang</option>
                                            {
                                                categoryArr.map(item => {
                                                    return (
                                                        <option key={item._id} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        :
                                        <h5 className="card-title">
                                            {data.name} kursi
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
                                <p>
                                    bitta kursda {
                                        edit ?
                                            <input value={studentnumber} onChange={e => setStudentNumber(e.target.value)} type="number" />
                                            :
                                            data.studentnumber
                                    } ta gacha odam olinadi
                                </p>
                                <p>
                                    kurs narxi oyiga {
                                        edit ?
                                            <input value={price} onChange={e => setPrice(e.target.value)} type="number" /> :
                                            (data.price) / 1000
                                    } ming so'm
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

export default CourseSingle;