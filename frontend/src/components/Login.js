import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/user-context'

const Login = () => {
  const ctx = useContext(UserContext)
  const history = useHistory()

  const handleEmailChange = (event) => {
    ctx.setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    ctx.setPassword(event.target.value)
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const existingUser = {
      email: ctx.email,
      password: ctx.password,
    }
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(existingUser)
      }

      const res = await fetch("http://localhost:5000/login", requestOptions)
      ctx.setAuth(true)
      ctx.setToken(res)


    } catch (err) {
      console.log(err)
    }


    history.push('/shop')
  }

  return (
    <div>Login
      <form>
        <input placeholder="Email" onChange={handleEmailChange} /><br />
        <input placeholder="Password" onChange={handlePasswordChange} /><br />
        <button onClick={handleLoginSubmit}>Submit</button>
      </form>

    </div>
  )
}

export default Login
