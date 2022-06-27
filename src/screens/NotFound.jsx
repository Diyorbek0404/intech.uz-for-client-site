import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';

const NotFound = () => {
    return (
        <div>
            <Sidebar />
            <div className="rightbar">
                <h1 className='text-center my-5'>404 - Not Found</h1>
            </div>
        </div>
    );
};

export default NotFound;