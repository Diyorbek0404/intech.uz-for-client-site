import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import axios from "axios"
import { axiosUrl, jwt } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Teacher = () => {
    const [name, setName] = useState("");
    const [lastname, setlastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [categoryList, setCategoryList] = useState([])


    // added new image
    const addImageTeacher = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "maktab");
        data.append("cloud_name", "cafe-uz")
        fetch("https://api.cloudinary.com/v1_1/cafe-uz/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                setUrl(data.url)
                alert("rasm bazaga qo'shildi")
            })
            .catch(error => {
                console.log(error)
            })
    }

    // add new teacher
    const addTeacher = async () => {
        const newTeacher = {
            name,
            email,
            lastname,
            phone,
            category,
            photo: url
        }
        try {
            const teacher = await axios.post(`${axiosUrl}/teacher`, newTeacher, {
                headers:{
                    "Authorization":"Bearer "+jwt
                }
            })
            console.log(teacher)
            toast.success('Muvafaqiyatli qo`shildi!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // window.location.replace("/teacher")
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

    // get all category
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get(`${axiosUrl}/category`, {
                    headers:{
                        "Authorization":"Bearer "+jwt
                    }
                })
                console.log(res.data)
                setCategoryList(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getCategory()
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
                <div className='p-2'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="shadow p-3 my-4" style={{
                                    borderRadius: "10px"
                                }}>
                                    <h3>O'qituvchi qo'shish</h3>
                                    <div className="form-react-add-teacher">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-12">
                                                <label htmlFor="name">Ismi</label>
                                                <input
                                                    type="text"
                                                    className='form-control shadow-none'
                                                    name=""
                                                    id="name"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-sm-12">
                                                <label htmlFor="lastname">Familyasi</label>
                                                <input
                                                    type="text"
                                                    className='form-control shadow-none'
                                                    name=""
                                                    id="lastname"
                                                    value={lastname}
                                                    onChange={e => setlastName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-sm-12">
                                                <label htmlFor="email">email</label>
                                                <input
                                                    type="email"
                                                    className='form-control shadow-none'
                                                    name=""
                                                    id="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-4 py-4 col-sm-12">
                                                {
                                                    image ?
                                                        <img className='w-100 my-3' src={URL.createObjectURL(image)} alt="" />
                                                        :
                                                        <img className='w-100 my-3' src="https://media.istockphoto.com/photos/illustration-of-standing-happy-man-talking-on-the-phone-close-up-of-picture-id1299126979?s=2048x2048" alt="" />
                                                }
                                                <label htmlFor="photo" className='btn btn-success w-100'>Rasmni tanlang</label>
                                                <input onChange={e => setImage(e.target.files[0])} type="file" id='photo' style={{
                                                    display: "none"
                                                }} />
                                                <button className='btn btn-success w-100 my-2' onClick={addImageTeacher}>rasmni saqlash</button>
                                            </div>
                                            <div className="col-lg-4 mt-4 col-sm-12">
                                                <label htmlFor="choosertouter">o'qitivchi yo'nalishi</label>
                                                <select
                                                    value={category}
                                                    onChange={e => setCategory(e.target.value)}
                                                    className="form-select shadow-none" id='choosertouter'
                                                >
                                                    <option defaultValue={"tanlang"}>tanlang</option>
                                                    {
                                                        categoryList.map(item => {
                                                            return (
                                                                <option key={item._id} value={item.name}>{item.name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>
                                            <div className="col-lg-4 mt-4 col-sm-12">
                                                <label htmlFor="qiymat">telefon raqami</label>
                                                <input
                                                    type="text"
                                                    className='form-control shadow-none'
                                                    placeholder='+998__ ___ __ __'
                                                    name=""
                                                    id="qiymat"
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <button onClick={addTeacher} className='btn btn-outline-primary w-25 shadow-none justify-content-center d-flex'>saqlash</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teacher;