import { useState } from "react";

export const Auth =() =>{
    return(
        <div>
            <Login/>
            <Register/>
        </div>
    );
}

const Login = () => {
    return(
        <div></div>
    )
}

const Register = () => {

    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");
    return(
        <div className="auth-container">
            <h2>Register</h2>
            <div className="form-group">
            <label htmlFor="username"> Username : </label>
            <input 
            type="text" 
            id="username" 
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label htmlFor="password"> Password : </label>
            <input
             type="text" 
             id="password" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit">Register</button>
        </div>
    )
}
