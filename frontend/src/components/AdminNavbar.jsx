import React from 'react'
import ThemeToggleButton from './ThemeToggleButton';


const AdminNavbar = () => {
    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/'

    }
    return (
        <div className="navbar max-w-[1200px] mx-auto shadow-sm lg:justify-between md:justify-between">
            <div className="navbar-end">
                <button 
                onClick={logOut}
                className="btn">
                    LogOut
                </button>
            </div>
            <div className='navbar-end gap-12'>
                <ThemeToggleButton />
            </div>
        </div>

    )
}

export default AdminNavbar
