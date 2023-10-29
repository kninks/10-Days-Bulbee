import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Auth.css";

interface FormData {
  sid: string;
  password: string;
}

async function LoginReq({ sid, password }: FormData): Promise<any> {
  const credentials = { sid, password };
  console.log(credentials);

  try {
    const response = await fetch("http://127.0.0.1:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("data");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    sid: "",
    password: "",
  });
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

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
      setCookies("access_token", response.token);
      window.sessionStorage.setItem("sid", response.sid);
      navigate("/home");
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
  };
  return (
    <div className="login-page">
      <div className="bulbee">Bulbee</div>
      <div className="auth-title">Sign in</div>
      <form onSubmit={handleSubmit}>
        <div className="form-card">
          <div>
            <label htmlFor="sid" className="auth-text-field-label">
              Student ID
            </label>
            <input
              type="text"
              name="sid"
              value={formData.sid}
              onChange={handleFormChange}
              placeholder="Enter your student ID"
              className="auth-text-field"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="auth-text-field-label">
              Password
            </label>
            <input
              type="password" // "password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              placeholder="Enter your password"
              className="auth-text-field"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Log in
          </button>
          <Link to="/register" className="redirect-text">
            Register for an account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
