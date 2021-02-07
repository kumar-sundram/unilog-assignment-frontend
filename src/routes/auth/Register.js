import React, { useState, useRef } from "react";
import { Link } from "react-router-dom"
import routes from "../../routes"
import { useForm } from "react-hook-form";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";
import axios from "../../component/Axios"
import Loader from "../../component/Loader";

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "15px",
        color: "white",
      },
    },
  },
});

const Register = ({ history }) => {
  const [isLoader, setIsLoader] = useState(false)
  const { handleSubmit, register, errors, watch } = useForm({
    mode: "onChange",
  });

  const newpassword = useRef({});
  newpassword.current = watch("newpassword", "");

  const onSubmit = (data) => {
    setIsLoader(true)
    const formData = {
      email: data.email.trim(),
      name: data.name.trim(),
      password: data.newpassword
    }
    axios.post('/users/register', formData)
      .then((response) => {
        swal(`Successfully signed up`, "", "success", {
          className: "custom-save"
        });
        history.push(routes.authLogin)
        setIsLoader(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoader(false)
      })
  };

  if (isLoader) {
    return <Loader />
  }

  return (
    <div className="login-container">
      <div className="register-card">
        <div className="header">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-form register">
            <div className="input-wrap">
              <label className="input-label">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className={errors.name ? "error-register" : ""}
                ref={register({
                  required: "Required",
                })}
              />
            </div>
            <div className="input-wrap">
              <label className="input-label">Email / Username</label>
              <input
                id="email"
                type="email"
                placeholder="me@email.com"
                name="email"
                className={errors.email ? "error-register" : ""}
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,7}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="" className="input-label">Password</label>
              <input
                id="newpassword"
                type="password"
                placeholder="****"
                name="newpassword"
                className={errors.newpassword ? "error-register" : ""}
                ref={register({
                  required: "Required",
                })}
              />
              {errors.newpassword && <MuiThemeProvider theme={theme}>
                <Tooltip title={"Password should be 8 - 15 characters, should contain atleast one lower case letter, one upper case letter, one numeric digit and one special character"} placement="top" arrow>
                  <span
                    className="material-icons ml-10 red-text err-txt"
                    style={{ fontSize: "16px" }}
                  >
                    error_outline
                      </span>
                </Tooltip>
              </MuiThemeProvider>}
            </div>
            <div className="input-wrap">
              <label htmlFor="" className="input-label">Confirm Password</label>
              <input
                id="cnfpassword"
                type="password"
                placeholder="****"
                name="cnfpassword"
                className={errors.cnfpassword ? "error-register" : ""}
                ref={register({
                  required: "Required",
                  validate: values =>
                    values === newpassword.current || "The passwords do not match"
                })}
              />
            </div>
            <button className="btn cursor-pointer">Sign Up</button>
            <div className="redirect-link">
              <Link className="link" to={routes.authLogin}>Already have account ?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register