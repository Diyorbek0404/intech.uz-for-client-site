import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosUrl, jwt } from '../App';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const Messages = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`${axiosUrl}/messages`, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                })
                console.log(res.data)
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessage()
    }, [])
    return (
        <div>
            <Sidebar />
            <div className='rightbar'>
                <Header />
                <h4 style={{
                    marginTop:"10px",
                }} className="mx-2">Foydalananuvchilar tomonidan yo'llangan onlayn xatlar</h4>
                <div className="container-fluid my-5 table-scroll-react">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ism</th>
                                <th scope="col">familya</th>
                                <th scope="col">telefon raqam</th>
                                <th scope="col">more</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((message, count) => {
                                    count = count + 1
                                    return (
                                        <tr key={message._id}>
                                            <th scope="row">{count}</th>
                                            <td>{message.name}</td>
                                            <td>{message.lastname}</td>
                                            <td>{message.phone}</td>
                                            <td>
                                                <Link to={`/messages-single/${message._id}`} className='btn shadow-none btn-outline-primary'>ko'proq</Link>
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

export default Messages;