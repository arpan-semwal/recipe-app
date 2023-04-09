import { useState } from "react";
import axios from 'axios';
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"

export const Auth =() =>{
    return(
        <div>
            <Login/>
            <Register/>
        </div>
    );
}


const Login = () => {
    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();
       
        try{
            const response = await axios.post("http://localhost:3001/auth/login" , {
                username,
                password
            });


            setCookies("setCookies" , response.data.token);
            window.localStorage.setItem("userID" , response.data.userID);
           navigate("/");

          
        
        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <Form username={username} 
        setUserName={setUserName} 
        password={password}  
        setPassword={setPassword}
        label="Login"
        onSubmit = {onSubmit}
        />
    );
};


const Register = () => {

    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");


    const onSubmit = async(e) => {
        e.preventDefault();
         try{
            await axios.post("http://localhost:3001/auth/register" , {
                username,
                password
            });
            alert("Registration Completed! Now Login.")
         }catch(err){
            console.log(err);
         }
    };
    
    return (
    <Form username={username} 
    setUserName={setUserName} 
    password={password} 
    setPassword={setPassword}
    label="Register"
    onSubmit={onSubmit}
    />
    ); 
       
};

const Form = ({username , setUserName , password , setPassword , label , onSubmit}) => {
    return(
        <form onSubmit={onSubmit}>
            <h2>{label}</h2>
            <div className="form-group">
                <label htmlFor="username">Username : </label>
                <input type="text"
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}  />

            </div>

            <div className="form-group">
                <label htmlFor="password">Password : </label>
                <input type="password" 
                id="password" 
                value={password}
                onChange={(e) =>setPassword(e.target.value) } />

            </div>

            <button type="submit">{label}</button>
        </form>
    );
}



