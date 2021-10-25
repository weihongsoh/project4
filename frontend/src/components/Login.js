import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(existingUser)
      }

      const res = await fetch("http://localhost:5000/login", requestOptions)

      if (res.ok) {
        ctx.setAuth(true)
        ctx.setToken(res)
        if (ctx.email === 'owner@email.com') {
          ctx.setRole(1)
        }
        history.push('/shop')

      } else {
        throw 'invalid'
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>Login
      <Link to="/">Don't have an account? Create one here</Link>
      <form>
        <input placeholder="Email" onChange={handleEmailChange} /><br />
        <input type='password' placeholder="Password" onChange={handlePasswordChange} /><br />
        <button onClick={handleLoginSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Login
