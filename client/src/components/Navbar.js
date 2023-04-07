import React from 'react'
import { Link } from 'react-router-dom'



export const Navbar = () => {
    return(
        <div className='navbar'>
            <img className='logo' src='../images/add.png' alt='logo'/>
            <Link to="/">Home</Link>
            <Link to="/createrecipe">Create Recipe</Link>
            <Link to="/savedrecipe">Saved Recipe</Link>
            <Link to="/auth">Login / Register</Link>
        </div>
    )
}