import React from "react"
import Routes from "../routes/Routes"
import routes from '../routes'

const Nav = ({ history, match: { path } }) => {
  const userName = window.localStorage.getItem("NAME")

  return (
    <div className="container">
      <div className="user-container">
        <p className="name"><i className="fas fa-user-circle user-logo"></i> {userName}</p>
        <button className="btn logout-btn cursor-pointer" onClick={() => { window.localStorage.clear(); history.push(routes.authLogin) }} >Logout</button>
      </div>
      <section>
        <Routes history={history} path={path} />
      </section>
    </div>
  )
}

export default Nav