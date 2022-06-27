import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { axiosUrl, jwt } from '../App';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleTeacher = () => {
    const [edit, setEdit] = useState(false)
    const [foiz, setFoiz] = useState('')
    const [data, setData] = useState({})
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [categoryArr, setCategoryArr] = useState([])
    const [category, setCategory] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const pathId = window.location.pathname.split("/")[2]
    // const [query, setQuery] = useState("");
    const [student, setStudent] = useState([])
    const [studentLength, setStudentLenght] = useState("")


    // setName(res.data[0].data.name)
    // setLastName(res.data[0].data.lastname)
    // setCategory(res.data[0].data.category)
    // setData(res.data)
    // setPhone(res.data[0].data.phone)
    // setEmail(res.data[0].email)
    // get teacher
    useEffect(() => {
        const getData = async () => {
            let reqTeacher = axios.get(`${axiosUrl}/teacher/${pathId}`, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            });
            let reqStudent = axios.get(`${axiosUrl}/student/teacher?q=${name}+${ lastname}`, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            });
            axios.all([reqStudent, reqTeacher]).then(axios.spread((...res) => {
                // const allCategory = res[0].data;
                // const allTeacher = res[1].data;

                setName(res[1].data.name)
                setLastName(res[1].data.lastname)
                setCategory(res[1].data.category)
                setData(res[1].data)
                console.log(res[1].data)
                setPhone(res[1].data.phone)
                setEmail(res[1].data.email)
                console.log(res[0])
                setStudent(res[0].data)
                setStudentLenght(res[0].data.length)
            }))
        }
        getData()
    }, [pathId, name, lastname])

    // back funcr=tion
    const backWindowSite = () => {
        window.history.back()
    }

    // delete teacher
    const deleteTeacher = async () => {
        try {
            await axios.delete(`${axiosUrl}/teacher/${data._id}`, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            })
            window.location.replace("/teacher-table")
        } catch (error) {
            console.log(error)
            toast.error('o`qituvchi o`chirishda xato!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    // update teacher
    async function updateTeacher() {
        const updatedTeacher = {
            name,
            lastname,
            category,
            email,
            phone
        }
        try {
            const res = await axios.put(`${axiosUrl}/teacher/${data._id}`, updatedTeacher, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            })
            console.log(res.data)
            setEdit(false)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    // get category
    const getCategory = async () => {
        try {
            const res = await axios.get(`${axiosUrl}/category/`, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            })
            setCategoryArr(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(studentLength)

    console.log(student[0])
    let sum = 0
    for (let i = 0; i < studentLength; i++) {
        sum += student[i].pay;
    }
    console.log(sum)
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
            <Sidebar />
            <div className='rightbar'>
                <Header />
                <div className="container-fluid my-2">
                    <button className='btn shadow-none' onClick={backWindowSite}>
                        <i className='fas fa-long-arrow-left fa-lg'></i>
                    </button>

                    <div className="shadow p-4" style={{
                        position: "relative"
                    }}>
                        <div className="row">
                            <div className="col-md-6">
                                <img style={{
                                    borderRadius: "10px",
                                    marginTop: "30px"
                                }} className='w-100' src={data.photo} alt="" />
                            </div>
                            <div className="col-md-6">
                                <div className='d-flex border-bottom px-1 my-2'>
                                    <h5>Ismi: </h5> <span className='px-2' style={{
                                        paddingTop: "2px"
                                    }}>
                                        {
                                            edit ?
                                                <input value={name} type="text" onChange={e => setName(e.target.value)} />
                                                :
                                                <span>{data.name}</span>
                                        }
                                    </span>
                                </div>
                                <div className='d-flex border-bottom px-1 my-2'>
                                    <h5>Familyasi: </h5> <span className='px-2' style={{
                                        paddingTop: "2px"
                                    }}>
                                        {
                                            edit ?
                                                <input value={lastname} onChange={e => setLastName(e.target.value)} type="text" />
                                                :
                                                <span>{data.lastname}</span>
                                        }
                                    </span>
                                </div>
                                <div className='d-flex border-bottom px-1 my-2'>
                                    <h5>Yo'nalishi: </h5> <span className='px-2' style={{
                                        paddingTop: "2px"
                                    }}>
                                        {
                                            edit ?
                                                <select name="" id="" onClick={getCategory} value={category} onChange={e => setCategory(e.target.value)}>
                                                    {
                                                        categoryArr.map(item => {
                                                            return (
                                                                <option key={item._id} value={item.name}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                :
                                                <span>{data.category}</span>
                                        }
                                    </span>
                                </div>
                                <div className='d-flex border-bottom px-1 my-2'>
                                    <h5>Telefon raqami: </h5> <span className='px-2' style={{
                                        paddingTop: "2px"
                                    }}>
                                        {
                                            edit ?
                                                <input onChange={e => setPhone(e.target.value)} value={phone} type="text" />
                                                :
                                                <span>{data.phone}</span>
                                        }
                                    </span>
                                </div>
                                <div className='d-flex border-bottom px-1 my-2'>
                                    <h5>elektron pochtasi: </h5> <span className='px-2' style={{
                                        paddingTop: "2px"
                                    }}>
                                        {
                                            edit ?
                                                <input onChange={e => setEmail(e.target.value)} value={email} type="text" />
                                                :
                                                <span>{data.email}</span>
                                        }
                                    </span>
                                </div>
                                <div className='d-flex border-bottom px-1 my-2'>
                                    <h5>qaysi kunlari keladi: </h5> <span className='px-2' style={{
                                        paddingTop: "2px"
                                    }}>
                                        {
                                            edit ?
                                                <input type="text" />
                                                :
                                                "Dushanba, Chorshanba, Juma"
                                        }
                                    </span>
                                </div>
                                {
                                    edit ?
                                        <button onClick={updateTeacher} className='btn shadow-none btn-outline-success'>
                                            yangliash
                                        </button>
                                        :
                                        null
                                }

                            </div>
                        </div>
                        {
                            edit ?
                                null
                                :
                                <div style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px"
                                }}>
                                    <button onClick={e => setEdit(true)} className='btn shadow-none btn-outline-info mx-2'>
                                        <i className="fas fa-user-edit fa-lg"></i>
                                    </button>
                                    <button onClick={deleteTeacher} className='btn shadow-none btn-outline-danger'>
                                        <i className="fas fa-trash-alt fa-lg"></i>
                                    </button>
                                </div>
                        }

                    </div>
                    <div className="shadow p-4 my-3">
                        <div className="container-fluid">
                            <h5>Oylik maoshi</h5>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 my-2">
                                    <label htmlFor="foiz">har bir o'quvchidan necha foiz oladi</label> <br />
                                    <select onChange={e => setFoiz(e.target.value)} value={foiz} className="form-select shadow-none" id='foiz'>
                                        <option defaultValue={"0"}>tanlang</option>
                                        <option value="10">10%</option>
                                        <option value="20">20%</option>
                                        <option value="30">30%</option>
                                        <option value="40">40%</option>
                                        <option value="50">50%</option>
                                        <option value="60">60%</option>
                                        <option value="70">70%</option>
                                        <option value="80">80%</option>
                                        <option value="90">90%</option>
                                        <option value="100">100%</option>
                                    </select>
                                </div>
                                {/* <div className="col-1">
                                    <button onClick={hisoblash} className='btn shadow-none btn-dark' style={{
                                        marginTop: "30px"
                                    }}>
                                        Ok
                                    </button>
                                </div> */}
                                <div className='col-md-2 col-sm-12' style={{
                                    marginTop: "10px"
                                }}>
                                    <span style={{
                                        fontWeight: "700"
                                    }}>jami maoshi</span>: <br />
                                    = {((sum * foiz) / 100)/1000} ming so'm
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className="shadow p-4 my-3">
                        <h5>O'quvchilari</h5>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ismi</th>
                                    <th scope="col">Familyasi</th>
                                    <th scope="col">Oyiga qancha to'laydi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    student.map((item, count) => {
                                        count = count + 1
                                        // const array = [1, 2, 3, 4];
                                        return (
                                            <tr key={item._id}>
                                                <th scope="row">{count}</th>
                                                <td>{item.name}</td>
                                                <td>{item.lastname}</td>
                                                <td>{item.pay} </td>
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
    );
};

export default SingleTeacher;