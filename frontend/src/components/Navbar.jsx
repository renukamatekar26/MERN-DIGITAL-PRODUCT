import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggleButton from './ThemeToggleButton'
import CartIcon from './CartIcon'

const Navbar = () => {
    return (
        <div className="navbar max-w-[1200px] mx-auto shadow-sm lg:justify-between md:justify-between">
            <div className="navbar-start lg:hidden md:hidden">
                <div className='dropdown '>
                    <button className="btn btn-square btn-ghost ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                    </button>
                    <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                    </ul>
                </div>
            </div>
            <a className="btn btn-ghost text-xl navbar-center lg:navbar-start md:navbar-start md:w-[30%]" href='/'>Ecommerce</a>
            
            <div className="lg:flex md:flex hidden navbar-center">
                <li className='list-none px-10'><Link to="/">Home</Link></li>
                <li className='list-none px-10'><Link to="/shop">Shop</Link></li>     
            </div>
            <div className='navbar-end gap-12'>
            <Link to="/cart"><CartIcon /> </Link>
                <ThemeToggleButton />
            </div>
        </div>
        
    )
}

export default Navbar
