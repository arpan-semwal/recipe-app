import {Link} from "react-router-dom"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom"

import "./Nav.css"
export const Navbar = () => {
      const [cookies , setCookies] = useCookies(["access_token"]);
      const navigate = useNavigate();

      const logout = () => {
        setCookies("access_token" , "");
        window.localStorage.removeItem("userID");
        navigate("/Auth");
      }
    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/CreateRecipe">Create Recipe</Link>
          
            {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
         <Link to="/SavedRecipe">Saved Recipes</Link>
        <button onClick={logout}> Logout </button>
        </>
    
      )}

        </div>
    );
}