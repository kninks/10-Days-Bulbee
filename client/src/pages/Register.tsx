import React, { ChangeEvent, useState } from 'react'

interface FormData {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    sid: string;
    password: string;
}

async function RegisterReq({ firstName, lastName, address, postalCode, sid, password }: FormData) : Promise<any> {
    const req = {firstName, lastName, address, postalCode, sid, password}
    console.log(req)

    try {
        const response = await fetch('http://127.0.0.1:4000/users/register' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function Register() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
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
            const response = await RegisterReq(formData);
            console.log("response");
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
            <h1>Bulbee</h1>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>First Name</p>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        placeholder="Enter your first name"
                    />

                    <p>Last Name</p>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        placeholder="Enter your last name"
                    />

                    <p>student id</p>
                    <input
                        type="text"
                        name="sid"
                        value={formData.sid}
                        onChange={handleFormChange}
                    />
                    
                    <p>Address</p>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                    />

                  <p>Postal Code</p>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleFormChange}
                    />

                    <p>password</p>
                    <input
                        type="text" // "password"
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        placeholder="Enter your name"
                    />
                    <p></p>

                    <button type="submit">Log in</button>
                    <p>Already have an account? Log in here</p>
                </div>
            </form>

            
        </div>
  )
}

export default Register