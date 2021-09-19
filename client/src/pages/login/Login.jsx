import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import { NavLink } from 'react-router-dom'
import "./login.css";

export default function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)
  const [errorMsg, setErrorMsg] = useState("")

  const handelSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
      setErrorMsg("Wrong Credential")
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
          <form className="loginBox" onSubmit={handelSubmit}>
            <input placeholder="Email" className="loginInput" ref={userRef} />
            <input placeholder="Password" className="loginInput" ref={passwordRef} />
            <button className="loginButton" type="submit" >Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" type="submit">
              <NavLink to="/register">Create a New Account</NavLink>
            </button>
            {errorMsg &&
              <h3 className="error"> {errorMsg} </h3>}
          </form>
        </div>
      </div>
    </div>
  );
}
