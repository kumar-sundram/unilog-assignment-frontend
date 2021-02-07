import React from 'react'
import axios from "../../component/Axios"
import routes from "../../routes"
import Loader from "../../component/Loader"

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedToken: localStorage.getItem('AUTH_TOKEN'),
      isLoader: false
    }
  }

  componentDidMount() {
    this.setState({ isLoader: true })
    axios.delete('/users/logout', { headers: { 'x-auth': localStorage.getItem('AUTH_TOKEN') } })
      .then((response) => {
        localStorage.clear()
        this.props.history.push(routes.authLogin)
        this.setState({ isLoader: false })
      })
      .catch((err) => {
        this.setState({ isLoader: false })
      })
  }

  render() {
    if (this.state.isLoader) {
      return <Loader />
    }
    return (
      <>
      </>
    )
  }
}

export default Logout