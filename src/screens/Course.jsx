import React, { useEffect, useState } from 'react';
import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"
import { Link } from 'react-router-dom';
import axios from "axios"
import { axiosUrl, jwt } from "../App"

const Course = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState('')
    const [studentnumber, setStudentnumber] = useState('')
    const [price, setPrice] = useState("")
    const [photo, setPhoto] = useState("")
    const [url, setUrl] = useState("")
    const [category, setCategory] = useState([])
    const [data, setData] = useState([])

    // add new image 
    const addImageTeacher = () => {
        const data = new FormData();
        data.append("file", photo);
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
    // course add 
    const addNewCourse = async () => {
        const newCourse = {
            name, description, studentnumber, price, photo: url
        }
        try {
            const res = await axios.post(`${axiosUrl}/course`, newCourse, {
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

    useEffect(() => {

        const getData = async () => {
            try {
                let resCategory = await axios.get(`${axiosUrl}/category/`, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                });
                let resCourse = await axios.get(`${axiosUrl}/course/`, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                });
                axios.all([resCategory, resCourse]).then(axios.spread((...res) => {
                    setData(res[1].data) // category
                    setCategory(res[0].data)
                }))
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])
    return (
        <div>
            <Sidebar />
            <div className="rightbar">
                <Header />
                <div className="container-fluid my-4">
                    <div className="shadow my-3 shadow p-4">
                        <h4>Kurslar qo'shish</h4>
                        <div className="row">
                            <div className="col-sm-12 col-md-4 my-2">
                                <label htmlFor="category">kurs nomi</label>
                                <select value={name} onChange={e => setName(e.target.value)} className="form-select" id='category'>
                                    <option defaultValue={"//"}>tanlang</option>
                                    {
                                        category.map(item => {
                                            return (
                                                <option key={item._id} value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-4 my-2">
                                <label htmlFor="soni">kursda nechta o'quvchi o'qiydi</label>
                                <input value={studentnumber} onChange={e => setStudentnumber(e.target.value)} type="number" id="soni" className='form-control' />
                            </div>
                            <div className="col-sm-12 col-md-4 my-2">
                                <label htmlFor="pay">kurs narxi (oyiga)</label>
                                <input value={price} onChange={e => setPrice(e.target.value)} type="number" id="pay" className='form-control' />
                            </div>
                            <div className="col-sm-12 col-md-4 my-2">
                                <label htmlFor="desc">kurs xaqida batafsil</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} id="desc" className='form-control' />
                            </div>
                            <div className="col-sm-12 col-md-4 my-2">
                                {
                                    photo ?
                                        <img className='w-100' style={{
                                            borderRadius: "10px"
                                        }} src={URL.createObjectURL(photo)} alt="" />
                                        :
                                        <img className='w-100' style={{
                                            borderRadius: "10px"
                                        }} src="https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                                }

                                <label htmlFor="file" className='btn shadow-none btn-outline-dark w-100 my-2'>kurs uchun rasm</label>
                                <button onClick={addImageTeacher} className='btn shadow-none btn-outline-dark w-100'>saqlash</button>
                                <input style={{
                                    display: "none"
                                }} onChange={e => setPhoto(e.target.files[0])} id="file" type={"file"} className='form-control' />
                            </div>
                            <div className="col-sm-12 col-md-4 my-2">
                                <button onClick={addNewCourse} className='btn shadow-none btn-success w-100'>qo'shish</button>
                            </div>
                        </div>
                    </div>

                    <div className="shadow p-4 my-1">
                        <h4>Kurslar ro'yxati</h4>
                        <div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Kurs nomi</th>
                                        <th scope="col">narxi</th>
                                        <th scope="col">o'chirish</th>
                                        <th scope="col">ko'proq</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, count) => {
                                            count = count + 1
                                            return (
                                                <tr key={item._id}>
                                                    <th scope="row">{count}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>
                                                        <button onClick={async () => {
                                                            try {
                                                                await axios.delete(`${axiosUrl}/course/${item._id}`, {
                                                                    headers: {
                                                                        "Authorization": "Bearer " + jwt
                                                                    }
                                                                })
                                                                window.location.reload()
                                                            } catch (error) {
                                                                console.log(error)
                                                            }
                                                        }} className='btn btn-danger'>delete</button>
                                                    </td>
                                                    <td><Link to={`/course/${item._id}`} className='btn btn-primary'>more</Link></td>
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

export default Course;