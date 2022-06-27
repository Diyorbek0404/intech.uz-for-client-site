import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [show, setShow] = useState(false)
    const router = window.location.pathname
    const user = JSON.parse(localStorage.getItem("user"))
    const shower = () => {
        setShow(!show)
    }

    const logoOut = () => {
        localStorage.clear();
        window.location.reload()
    }

    return (
        <div className='shadow py-2 w-100'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 d-flex">
                        <button className="btn btn-dark show-phone" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            <i className='fas fa-bars'></i>
                        </button>

                        <div className="offcanvas offcanvas-start bg-dark" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title text-white" id="offcanvasExampleLabel">Intech</h5>
                                <button type="button" className="btn-danger btn" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className='my-5' style={{
                                    marginLeft: "0",
                                    color: "#fff",
                                    listStyle: "none",
                                    paddingLeft: "0"
                                }}>
                                    <Link className='link-react' to={"/"} style={{
                                        backgroundColor: router === "/" ? "#555" : null
                                    }}>
                                        <i className='fas fa-home'></i> Bosh sahifa
                                    </Link>
                                    <Link to={"/teacheradd"} className='link-react' style={{
                                        backgroundColor: router === "/teacheradd" ? "#555" : null
                                    }}>
                                        <i className="fas fa-plus"></i> mentor qo'shish
                                    </Link>
                                    <Link to={"/teacher"} className='link-react' style={{
                                        backgroundColor: router === "/teacher" ? "#555" : null
                                    }}>
                                        <i className="fas fa-chalkboard-teacher"></i> mentorlar ro'yxati
                                    </Link>
                                    <Link to={"/studentadd"} className='link-react' style={{
                                        backgroundColor: router === "/studentadd" ? "#555" : null
                                    }}>
                                        <i className="fas fa-user-plus"></i> o'quvchi qo'shish
                                    </Link>
                                    <Link to={"/student"} className='link-react' style={{
                                        backgroundColor: router === "/student" ? "#555" : null
                                    }}>
                                        <i className="fad fa-user-graduate"></i> o'quvchilar ro'yxati
                                    </Link>
                                    <Link to={"/messages"} className='link-react' style={{
                                        backgroundColor: router === "/messages" ? "#555" : null
                                    }}>
                                        <i className="fas fa-comment-alt-dots"></i> xabarlar
                                    </Link>
                                    <Link to={"/news"} className='link-react' style={{
                                        backgroundColor: router === "/news" ? "#555" : null
                                    }}>
                                        <i className="fas fa-newspaper"></i> yangiliklar
                                    </Link>
                                    <Link to={"/course"} className='link-react' style={{
                                        backgroundColor: router === "/course" ? "#555" : null
                                    }}>
                                        <i className="fab fa-leanpub"></i> kurslar
                                    </Link>
                                    <Link to={"/dasturchi"} className='link-react' style={{
                                        backgroundColor: router === "/dasturchi" ? "#555" : null,
                                        marginTop: "100px"
                                    }}>
                                        <i className="fas fa-code"></i> Dasturchi
                                    </Link>
                                </ul>

                            </div>
                        </div>
                        <h4 className='show-h4-phone'>Hello, {user.name}</h4>
                    </div>
                    <div className="col-6" style={{
                        position: "relative"
                    }}>
                        <div className='input-form-react shadow d-flex' onClick={shower}>
                            <input type="text" className='input-form-item' name="" id="" />
                            <i style={{
                                paddingTop: "5px",
                                paddingRight: "10px"
                            }} className='fas fa-search text-muted'></i>
                        </div>
                        {
                            show ?
                                <div className='bg-white shadow p-2' style={{
                                    position: "absolute",
                                    right: "60px",
                                    left: "20px",
                                    width: "100%",
                                    zIndex: "999"
                                }}>
                                    <Link to={"/"}>Home</Link> <br />
                                    <Link to={"/dasturchi"}>dasturchi</Link> <br />
                                    <Link to={"/teacher"}>mentor</Link> <br />
                                    <Link to={"/student"}>o'quvchilar</Link> <br />
                                    <Link to={"/messages"}>xabarlar</Link>
                                </div>
                                :
                                null
                        }

                    </div>

                    <div className="col-4 d-flex">
                        <div className="dropdown">
                            <button className='btn shadow-none btn-outline-dark dropdown-toggle' id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className='fas fa-user'></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-macos mx-0 border-0 shadow" style={{
                                width: "220px"
                            }}>
                                <li className='dropdown-item active'>{user ? user.name : null}</li>
                                <li className='dropdown-item'>{user ? user.centername : null}</li>
                                <li className='dropdown-item'>{user ? user.phone : null}</li>
                                <li><hr className="dropdown-divider" /></li>
                                <li onClick={logoOut} className='dropdown-item'>chiqish</li>
                            </ul>
                            {/* <div className="dropdown-menu p-2 shadow" aria-labelledby="dropdownMenuButton1">
                                <span style={{
                                    fontWeight: "600"
                                }}>Ism</span>: <br /> {user ? user.name : null} <br />
                                <span style={{
                                    fontWeight: "600"
                                }}>o'quv markaz nomi</span>:  <br />{user ? user.centername : null} <br />
                                <span style={{
                                    fontWeight: "600"
                                }}>phone: </span> <br /> {user ? user.phone : null}
                                <button onClick={logoOut} className='btn btn-danger'>chiqish</button>
                            </div> */}
                        </div>
                        <Link to={"/messages"} className='btn shadow-none btn-outline-primary mx-2'>
                            <i className='fas fa-bell'></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;