import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import axios from "axios"
import { axiosUrl, jwt } from "../App"

const PayHistory = () => {
    const [pay, setPay] = useState("")
    const [payHistory, setPayHistory] = useState([])
    const [payCheck, setPayCheack] = useState("")
    const [teng, setTeng] = useState("")
    const [select, setSelect] = useState("")
    const [lenPay, setlenPay] = useState("")
    const pathId = window.location.pathname.split("/")[2]
    const dcaw = window.location.pathname.split("/")
    console.log(dcaw)

    const backWindowSite = () => {
        window.history.back()
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""];
    // const d = new Date();
    // let month = months[d.getMonth()];
    const addNewPay = async () => {
        const addPay = {
            paynumber: pay,
            month: select
        }
        try {
            const res = await axios.put(`${axiosUrl}/student/${pathId}/pay`, addPay, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            })
            console.log(res.data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchPay = async () => {
            try {
                let resone = await axios.get(`${axiosUrl}/student/${pathId}`, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                })
                let resPay = await axios.get(`${axiosUrl}/student/${pathId}/pay?queryf=${select}`, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                })
                axios.all([resone, resPay]).then(axios.spread((...res) => {
                    // setPayHistory(res[0].data.payhistory.reverse())
                    setPayCheack(res[0].data.pay)
                    // console.log(res[0].data)
                    setPayHistory(res[1].data)
                    console.log(res[1].data)
                    setlenPay(res[1].data.length)
                }))
                // console.log(data)

                // console.log(sum)
                // setTeng(sum)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPay()
    }, [select, pathId])

    // const cafcaf = () => {
    //     let sum = 0
    //     for (let i = 0; i < lenPay; i++) {
    //         console.log(payHistory[i].paynumber)
    //     }
    //     setTeng(sum)
    //     console.log(sum)
    // }
    let sum = 0

    return (
        <div>
            <Sidebar />
            <div className='rightbar'>
                <Header />
                <div className="container-fluid my-3">

                    {/* header part */}
                    <div className="row border-bottom">
                        <div className="col-2">
                            <button className='btn shadow-none' onClick={backWindowSite}>
                                <i className='fas fa-long-arrow-left fa-lg'></i>
                            </button>
                        </div>
                        <div className="col-10">
                            <h4 className='text-center'>To'lovlar tarixi</h4>
                        </div>
                    </div>
                    {/* table content */}
                    <div className='filter-scroll py-2 d-flex'>
                        {
                            months.map(pay => {
                                return (
                                    <button onClick={e => setSelect(pay)} key={pay} className='px-2 mx-1 d-block' style={{
                                        border: "1px solid #777",
                                        paddingTop: "1px",
                                        paddingBottom: "1px",
                                        borderRadius: "10px",
                                        // backgroundColor: month === select ? "#333" : "fff"
                                    }}>{pay}</button>
                                )
                            })
                        }
                    </div>
                    <button className='btn shadow-none btn-dark my-2' onClick={() => {
                        for (let i = 0; i < lenPay; i++) {
                            sum = sum + Number(payHistory[i].paynumber)
                        }
                        setTeng(sum)
                        console.log(sum)
                    }}>filter</button>
                    <div className="shadow p-3 my-3" style={{
                        borderRadius: "20px"
                    }}>
                        <div className="row">
                            <h5>To'lov qilish</h5>
                            <div className="col-10">
                                <input value={pay} onChange={e => setPay(e.target.value)} type="number" className='form-control' />
                            </div>
                            <div className="col-2">
                                <button disabled={false} onClick={addNewPay} className='btn shadow-none btn-primary'>ok</button>
                            </div>
                        </div>
                    </div>
                    <div className="shadow p-3 my-3 text-white" style={{
                        borderRadius: "20px",
                        backgroundColor: payCheck <= teng ? "#28a745" : "#dc3545"
                    }}>
                        {
                            payCheck <= teng
                                ?
                                <h4>bu oy uchun to'liq to'lov qilgan  -  {Number(teng)} ming so'm</h4>
                                :
                                <div>
                                    <h5>to'lashi kerak - {((payCheck - Number(teng)) / 1000)} ming so'm</h5> <br />
                                    <h5>to'lagan - {(teng / 1000)} ming som</h5>
                                </div>

                        }

                    </div>
                    {
                        payHistory.map(item => {
                            return (
                                <div key={item._id} className="shadow p-3 my-3" style={{
                                    borderRadius: "20px"
                                }}>
                                    <h4>
                                        {(item.paynumber) / 1000} ming so'm to'ladi - {new Date(item.date).toLocaleString()}
                                    </h4>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    );
};

export default PayHistory;