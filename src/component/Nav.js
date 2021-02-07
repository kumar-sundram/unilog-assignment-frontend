import React from "react"
import Routes from "../routes/Routes"
import routes from '../routes'
import { Link, withRouter } from "react-router-dom"

const Nav = ({ history, match: { path } }) => {
  const userName = window.localStorage.getItem("NAME")

  return (
    <div className="container">
      <div className="user-container">
        <p className="name"><i className="fas fa-user-circle user-logo"></i> {userName}</p>
        <Link className="logout-btn" to={routes.authLogout}><button className="btn logout-btn cursor-pointer" >Logout</button></Link>
      </div>
      <section>
        <Routes history={history} path={path} />
      </section>
    </div>
  )
}

export default withRouter(Nav)