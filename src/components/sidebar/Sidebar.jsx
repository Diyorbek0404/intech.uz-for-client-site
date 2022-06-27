import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const router = window.location.pathname
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <div>
            <div className='sidebar bg-dark p-3'>
                <h2 className='text-white text-center my-2'>{user ? user.centername: null}</h2>

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

    );
};

export default Sidebar;