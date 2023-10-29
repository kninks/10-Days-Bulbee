import React, { ChangeEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import AuthContext from '../context/AuthProvider';

import './Auth.css'

interface FormData {
    sid: string;
    password: string;
}

async function LoginReq({ sid, password }: FormData): Promise<any> {
    const credentials = { sid, password };
    console.log(credentials);

    try {
        const response = await fetch('http://127.0.0.1:4000/auth/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("data")
        console.log(data)
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function Login() {
    const [formData, setFormData] = useState<FormData>({
        sid: "",
        password: "",
    });
    const [tryAgain, setTryAgain] = useState("no")
    const [cookie, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await LoginReq(formData);
            if (response.status) {
                setTryAgain(" ");
                console.log(response)
                window.localStorage.setItem("access_token", response.accessToken);
                navigate("/home")
            } else {
                setTryAgain(response.result);
            }
            
            // if ("access_token" in response) {
            //     setCookies("access_token", response.token);
            //     window.localStorage.setItem("sid", response.sid);
            //     navigate("/home")
            // } else {
            //     console.log(response);
            // }
            
      
            // if ('accessToken' in response) {
            //   alert(`Access allowed! ${response.accessToken}`);
            //   // localStorage.setItem('accessToken', response.accessToken);
            //   // window.location.href = "/cHome";
            // } else {
            //   alert("Could not find your account. Sign up to create a new account.");
            // }
        } catch (error) {
            console.error(error);
            // Handle error state here
        }
    }

    const handleLogout = async () => {
        const response = await fetch('http://127.0.0.1:4000/auth/logout' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: 'include',
            body: JSON.stringify({accessToken: window.localStorage.getItem("access_token")})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Assuming the logout was successful, clear the localStorage and cookies
        window.localStorage.removeItem('access_token');
    }
    return (
        <div>
            <div className='bulbee'>Bulbee</div>
            <div className='auth-title'>Sign in</div>
            <form onSubmit={handleSubmit}>
                <div className='form-card'>
                    <div>
                        <label htmlFor="sid" className='auth-text-field-label'>Student ID</label>
                        <input
                            type="text"
                            id="sid"
                            name="sid"
                            value={formData.sid}
                            onChange={handleFormChange}
                            placeholder="Enter your student ID"
                            className='auth-text-field'
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className='auth-text-field-label'>Password</label>
                        <input
                            type="password" // "password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            placeholder="Enter your password"
                            className='auth-text-field'
                            required
                        />
                    </div>
                    <div className='not-auth-text'>
                        {tryAgain}
                    </div>
                    <button type="submit" className='submit-button'>Log in</button>
                        <Link to='/register' className='redirect-text'>Register for an account</Link>

                </div>
            </form>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Login