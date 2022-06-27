import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { axiosUrl, jwt } from '../App';

const StudentAdd = () => {
    // for new Student
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [category, setCategory] = useState("")
    const [pay, setPay] = useState("")
    const [teacher, setTeacher] = useState("")
    // get category 
    const [categoryArr, setCategoryArr] = useState([])
    // get teacher
    const [teacherArr, setTeacherArr] = useState([])
    
    // add new student
    const addStudent = async () => {
        const newStudent = {
            name,
            lastname,
            category,
            pay,
            teacher,
        }
        try {
            const res = await axios.post(`${axiosUrl}/student`, newStudent, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            });
            console.log(res)
            toast.success('o`qituvchi muvafaqiyatli qo`shildi!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.log(error)
            toast.error('o`qituvchi qo`shishda xato!', {
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

    // get category and teacher
    useEffect(() => {
        const getCategoryAndTeacher = () => {
            let reqCategory = axios.get(`${axiosUrl}/category`, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            });
            let reqTeacher = axios.get(`${axiosUrl}/teacher`, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            });

            axios.all([reqCategory, reqTeacher]).then(axios.spread((...res) => {
                const allCategory = res[0].data;
                const allTeacher = res[1].data;
                console.log(allTeacher[0].name, allTeacher[0].lastname)

                setCategoryArr(allCategory)
                setTeacherArr(allTeacher)
            }))
        }
        getCategoryAndTeacher()
    }, [])

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
                <div className="container-fluid my-5">
                    <div className="shadow p-3">
                        <h5>O'quvchi qo'shish</h5>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12 my-2">
                                <label htmlFor="ismi">
                                    Ismi
                                </label>
                                <input
                                    type="text"
                                    className='form-control'
                                    id='ismi'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 my-2">
                                <label htmlFor="familyasi">
                                    familyasi
                                </label>
                                <input
                                    type="text"
                                    className='form-control'
                                    id='familyasi'
                                    value={lastname}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 my-2">
                                <label htmlFor="yonalishi">
                                    yo'nalishi
                                </label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="form-select" id='yonalishi'>

                                    <option defaultValue={"tanlang"}>tanlang</option>
                                    {
                                        categoryArr.map(item => {
                                            return (
                                                <option key={item._id} value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 my-2">
                                <label htmlFor="oyiga">
                                    qancha to'lashi (*somda)
                                </label>
                                <input
                                    value={pay}
                                    onChange={e => setPay(e.target.value)}
                                    type="number"
                                    className='form-control'
                                    id='oyiga'
                                />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 my-2">
                                <label htmlFor="teachei">
                                    O'qituvchi
                                </label>
                                <select value={teacher} onChange={e => setTeacher(e.target.value)} className="form-select" id='teachei'>

                                    <option defaultValue={"tanlang"}>tanlang</option>
                                    {
                                        teacherArr.map(item => {
                                            return (
                                                <option key={item._id} value={`${item.name} ${ item.lastname}`}>{item.name} {item.lastname}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 my-2">
                                <button onClick={addStudent} className='btn shadow-none btn-success' style={{
                                    marginTop: "23px"
                                }}
                                disabled={!name || !lastname || !teacher || !category || !pay || pay < 10000 ? true : false}
                                >
                                    saqlash
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAdd;