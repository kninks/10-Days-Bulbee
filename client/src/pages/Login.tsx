import React, { ChangeEvent, useState } from 'react'
import * as ReactDOM from 'react-dom/client';
import './User.css'

function Login() {
    const [sid, setSid] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSidChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSid(event.target.value);
      };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        console.log(`sid: ${sid}`);
        console.log(`password: ${password}`);
    }
    return (
        <div>
            <h1>Bulbee</h1>
            <h2>Sign in</h2>
            <form>
                <div className='form-container'>
                    <p>student id</p>
                    <input
                        type="text"
                        value={sid}
                        onChange={handleSidChange}
                        placeholder="Enter your name"
                    />
                    <p>password</p>
                    <input
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your name"
                    />
                    <p></p>
                    <button onClick={handleLogin}>Log in</button>
                    <p>Register for an account</p>
                </div>
            </form>

            
        </div>
    )
}

export default Login