import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const Dasturchi = () => {
    return (
        <div>
            <Sidebar />
            <div className='rightbar'>
                <Header />
                <div className="container my-5">
                    <div className="shadow p-4" style={{
                        borderRadius: "30px"
                    }}>
                        <h4 className='text-center'> Dasturchi: Quldoshev Diyorbek</h4>
                        <h4 className='my-4 text-center'> Telefon raqam: +998998030118</h4>
                        <h4 className='my-4 text-center'> Email: uzbekistancoder@gmail.com</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dasturchi;