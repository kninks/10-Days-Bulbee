import React, { ChangeEvent, useState } from 'react'

interface FormData {
    sid: string;
    password: string;
}

async function LoginReq({ sid, password }: FormData): Promise<any> {
    const credentials = { sid, password };
    console.log(credentials);

    try {
        const response = await fetch('http://127.0.0.1:4000/users/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
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
            console.log(response);
      
            // if ('accessToken' in response) {
            //   alert(`Access allowed! ${response.accessToken}`);
            //   // localStorage.setItem('accessToken', response.accessToken);
            //   // window.location.href = "/cHome";
            // } else {
            //   alert("Could not find your account. Sign up to create a new account.");
            // }
        } catch (error) {
            console.error('Error:', error);
            // Handle error state here
        }
    }
    return (
        <div>
            <h1>Bulbee</h1>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>student id</p>
                    <input
                        type="text"
                        name="sid"
                        value={formData.sid}
                        onChange={handleFormChange}
                        placeholder="Enter your student is"
                    />
                    <p>password</p>
                    <input
                        type="text" // "password"
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        placeholder="Enter your password"
                    />
                    <p></p>
                    <button 
                        type="submit"
                    >
                        Log in
                    </button>
                    <p>Register for an account</p>
                </div>
            </form>

            
        </div>
    )
}

export default Login