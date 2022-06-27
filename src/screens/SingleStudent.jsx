import React, { useEffect, useState } from 'react';
import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"
import axios from 'axios';
import { axiosUrl, jwt } from '../App';
import { Link } from 'react-router-dom';

const SingleStudent = () => {
    const [data, setData] = useState({})
    const [teacher, setTeacher] = useState([])
    const [category, setCategory] = useState([])
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [categoryArr, setCategoryArr] = useState("")
    const [teacherArr, setTeacherArr] = useState("")
    const [pay, setPay] = useState("")

    const backWindowSite = () => {
        window.history.back()
    }
    const pathId = window.location.pathname.split("/")[2]
    useEffect(() => {

        const getData = async () => {
            try {
                let resStudent = await axios.get(`${axiosUrl}/student/${pathId}`, {
                    headers:{
                        "Authorization":"Bearer "+jwt
                    }
                });
                let resCategory = await axios.get(`${axiosUrl}/category/`, {
                    headers:{
                        "Authorization":"Bearer "+jwt
                    }
                });
                let resTeacher = await axios.get(`${axiosUrl}/teacher/`, {
                    headers:{
                        "Authorization":"Bearer "+jwt
                    }
                });
                axios.all([resTeacher, resCategory, resStudent]).then(axios.spread((...res) => {
                    setCategory(res[1].data) // category
                    setTeacher(res[0].data) // teacher
                    setData(res[2].data) // student
                    setName(res[2].data.name)
                    setLastname(res[2].data.lastname)
                    setPay(res[2].data.pay)
                    setCategoryArr(res[2].data.category)
                    setTeacherArr(res[2].data.teacher)
                }))
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [pathId])

    // delete student
    const deleteStudent = async() => {
        try {
            await axios.delete(`${axiosUrl}/student/${pathId}`, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            })
            window.location.replace("/student")
        } catch (error) {
            console.log(error)
        }
    }

    // update Student
    const updateStudent = async() => {
        const updatedStudent = {
            name,
            lastname,
            category: categoryArr,
            pay,
            teacher:teacherArr
        }
        try {
            const res = await axios.put(`${axiosUrl}/student/${pathId}`, updatedStudent, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            })
            console.log(res.data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    console.log(categoryArr)

    return (
        <div>
            <Sidebar />
            <div className="rightbar">
                <Header />
                <div className="container-fluid my-2">
                    <button className='btn shadow-none' onClick={backWindowSite}>
                        <i className='fas fa-long-arrow-left fa-lg'></i>
                    </button>
                    <div className="shadow p-5" style={{
                        position: "relative"
                    }}>
                        <div className="row">
                            <div className="col-md-4 my-2 col-sm-6">
                                <h5>Ismi: </h5> {
                                    edit ?
                                        <input type="text" value={name} onChange={e=>setName(e.target.value)} />
                                        :
                                        data.name
                                }
                            </div>
                            <div className="col-md-4 my-2 col-sm-6">
                                <h5>Familyasi: </h5> {
                                    edit ?
                                        <input type="text" value={lastname} onChange={e=>setLastname(e.target.value)} />
                                        :
                                        data.lastname
                                }
                            </div>
                            <div className="col-md-4 my-2 col-sm-6">
                                <h5>Yo'nalishi: </h5> {
                                    edit ?
                                        <select value={categoryArr} onChange={e => setCategoryArr(e.target.value)} name="" id="">
                                            <option value="w">tanlang</option>
                                            {
                                                category.map(item => {
                                                    return (
                                                        <option key={item._id} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                        :
                                        data.category
                                }
                            </div>
                            <div className="col-md-4 my-2 col-sm-6">
                                <h5>O'qituvchi: </h5> {
                                    edit ?
                                        <select value={teacherArr} onChange={e=>setTeacherArr(e.target.value)} name="" id="">
                                            <option value="s">tanlang</option>
                                            {
                                                teacher.map(item => {
                                                    return (
                                                        <option key={item._id} value={`${item.name} ${ item.lastname}`}>{item.name} {item.lastname}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        :
                                        data.teacher
                                }
                            </div>
                            <div className="col-md-4 my-2 col-sm-6">
                                <h5>Oylik to'lovi: </h5> {
                                    edit ?
                                        <input type="number" value={pay} onChange={e=>setPay(e.target.value)} />
                                        :
                                        (data.pay) / 1000
                                } ming som
                            </div>
                            <div className="col-md-4 my-2 col-sm-6">
                                <h5>history</h5>
                                <Link to={`/payhistory/${data._id}`} className='btn shadow-none btn-outline-dark'>
                                    ComeHistory
                                </Link>
                                <Link to={`/comehistory/${data._id}`} className='btn shadow-none btn-outline-dark'>
                                    PayHistory
                                </Link>
                            </div>
                        </div>
                        <div style={{
                            position: "absolute",
                            top: "0",
                            right: "0"
                        }}>
                            {
                                edit ?
                                    <div>
                                        <button onClick={updateStudent} className='btn shadow-none btn-success'><i className="fas fa-sync-alt px-1"></i>update</button>
                                    </div>
                                    :
                                    <div>
                                        <button onClick={deleteStudent} className='btn shadow-none btn-danger'><i className="fas fa-trash-alt px-1"></i>delete</button>
                                        <button onClick={e => setEdit(true)} className='btn shadow-none btn-primary mx-2'><i className="fas fa-pencil-alt px-1"></i>edit</button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleStudent;