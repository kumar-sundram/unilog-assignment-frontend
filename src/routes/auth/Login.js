import React, { useState } from "react"
import { Link } from "react-router-dom"
import routes from "../../routes"
import swal from "sweetalert";
import axios from "../../component/Axios"
import Loader from "../../component/Loader";

const Login = ({ history }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoader(true)
    const formData = {
      email: username.trim(),
      password: password,
    }
    axios.post('/users/login', formData)
      .then((response) => {
        const { token } = response.data.token
        window.localStorage.setItem('AUTH_TOKEN', token)
        window.localStorage.setItem('NAME', response.data.token.user)
        history.push("/")
        setIsLoader(false)
      })
      .catch((err) => {
        swal(`${err}`, "", "warning", {
          className: "custom-save"
        });
        setIsLoader(false)
      })
  };

  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  if (isLoader) {
    return <Loader />
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <h2>Login</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="login-form">
            <div className="input-wrap">
              <label className="input-label">Email</label>
              <input type="text" placeholder="me@gmail.com"
                value={username}
                onChange={event => {
                  setUsername(event.target.value);
                }} />
            </div>
            <div className="input-wrap">
              <label className="input-label">Password</label>
              <div className="password-wrap">
                <input type={hidePassword ? 'password' : 'text'}
                  placeholder="Password"
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                  required />
                <div className="cursor-pointer eye" >
                  {!hidePassword && <span className="material-icons" onClick={togglePassword}>visibility</span>}
                  {hidePassword && <span className="material-icons" onClick={togglePassword}>visibility_off</span>}
                </div>
              </div>
            </div>
            <button className="btn cursor-pointer">Login</button>
            <div className="redirect-link">
              <Link className="link" to={routes.authRegister}>Create New Account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login