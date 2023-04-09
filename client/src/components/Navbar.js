import React , { useState }from 'react'
import { Link } from 'react-router-dom'
import {useCookies} from "react-cookie" 
import {useNavigate} from "react-router-dom"


export const Navbar = () => {
    const [cookies , setCookies] = useCookies(["access_token"]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        setIsLoggedIn(!!cookies.access_token);
      }, [cookies.access_token]);

    const logout = () => {
        setCookies("access_token" , "");
        window.localStorage.removeItem("userID");
        setIsLoggedIn(false);
        navigate("/auth");
    };




    return(
        <div className='navbar'>
            <img className='logo' src='../images/add.png' alt='logo'/>
            <Link to="/">Home</Link>
            <Link to="/createrecipe">Create Recipe</Link>
            <Link to="/savedrecipe">Saved Recipe</Link>
            <button onClick={logout}></button>

        </div>   
    
    );
};