import axios from 'axios'
import { useState } from "react";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [AgainPassword, setAgainPassword] = useState("")
  const [error, setError] = useState(false)

  const hendleSubmit = async (e) => {
    e.preventDefault()

    setError(false)
    if (password === AgainPassword) {

      try {
        const res = await axios.post("/auth/register", {
          username, email, password,
        });
        res.data && window.location.replace("/login")
        window.alert("Registration Successful")

      } catch (error) {
        console.log(error);
        setError(true)
      }

    } else {
      setError("Password don't match")
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={hendleSubmit}>
            <input placeholder="Username" className="loginInput" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Email" className="loginInput" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" className="loginInput" onChange={(e) => setPassword(e.target.value)} />
            <input placeholder="Password Again" className="loginInput" onChange={(e) => setAgainPassword(e.target.value)} />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
          {error && <span>Something went wrong</span>}
        </div>
      </div>
    </div>
  );
}
