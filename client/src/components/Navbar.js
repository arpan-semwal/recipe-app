import React from 'react'
import { Link } from 'react-router-dom'
import {useCookies} from "react-cookie" 
import {useNavigate} from "react-router-dom"


export const Navbar = () => {
    const [cookies , setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token" , "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };


    return(
        <div className='navbar'>
            <img className='logo' src='../images/add.png' alt='logo'/>
            <Link to="/">Home</Link>
            <Link to="/createrecipe">Create Recipe</Link>
            <Link to="/savedrecipe">Saved Recipe</Link>


        {!cookies.access_token ? (
            <Link to="/auth">Login/Register</Link>
        ) : (
            <button onClick={logout}>logout</button>
        )}
            
           
        </div>
    );
};