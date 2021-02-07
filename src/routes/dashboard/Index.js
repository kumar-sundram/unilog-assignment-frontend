import React, { useEffect, useState } from "react"
import { isEmpty } from "../../utils/Utils"
import axios from '../../component/Axios'
import Loader from "../../component/Loader"

const Dash = () => {
  const [lists, setLists] = useState([])
  const [text, setText] = useState('')
  const [file, setFile] = useState("")

  const fetchList = () => {
    axios.get('/dash', {
      headers: {
        'x-auth': localStorage.getItem('AUTH_TOKEN')
      }
    })
      .then((response) => {
        const data = response.data
        setLists(data.reverse())
      })
      .catch((err) => {
      })
  }

  useEffect(() => {
    fetchList()
  }, [])

  const postSubmit = () => {
    const data = new FormData()
    data.append("text", text)
    for (let item of file) {
      data.append("image", item)
    }
    axios.post('/dash', data, {
      headers: {
        'x-auth': localStorage.getItem('AUTH_TOKEN')
      }
    })
      .then((response) => {
        setText("")
        setFile("")
        document.getElementById("filecap").value = ""
        fetchList()
      })
      .catch((err) => {
      })
  }

  return (
    <>
      <div className="create-post">
        <textarea className="create-post-area" placeholder="Start writing something......" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <div className="image-select">
          <input type="file" id="filecap" multiple name="image" accept="image/*" onChange={(e) => setFile(e.target.files)} />
          <button className="btn post-btn cursor-pointer" onClick={postSubmit} disabled={isEmpty(text) && isEmpty(file)}>Post</button>
        </div>
      </div>
      {!isEmpty(lists) && lists.reverse().map((item, idx) => <div className="post-area" key={idx}>
        <div className="post">
          <p className="post-user-name"><i className="fas fa-user-circle post-user-logo"></i>{item.user && item.user.name}</p>
          <p className="post-text">
            {item.text}
          </p>
          {!isEmpty(item.image) && <img className="post-image" src={`${item.image[0]}`} alt=" " />}
        </div>
      </div>)}
      {isEmpty(lists) && <Loader />}
      {/* <div class="post-area">
        <div class="post">
          <p class="post-user-name"><i class="fas fa-user-circle post-user-logo"></i> User Name</p>
          <p class="post-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua.
                </p>
          <img class="post-image" src="/img/post1.jpg" alt=" " />
        </div> */}
      {/* <div class="post">
          <p class="post-user-name"><i class="fas fa-user-circle post-user-logo"></i> User Name</p>
          <p class="post-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
                </p>
        </div> */}
      {/* <div class="post">
          <p class="post-user-name"><i class="fas fa-user-circle post-user-logo"></i> User Name</p>
          <img class="post-image" src="/img/post2.jpg" alt=" " />
        </div> */}
      {/* <div class="post">
          <p class="post-user-name"><i class="fas fa-user-circle post-user-logo"></i> User Name</p>
          <p class="post-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
                </p>
          <img class="post-image" src="/img/post3.jpg" alt=" " />
        </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default Dash