import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../context/user-context'

const Signup = () => {
  const ctx = useContext(UserContext)
  const history = useHistory()

  const handleNameChange = (event) => {
    ctx.setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    ctx.setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    ctx.setPassword(event.target.value)
  }

  const handleVerifyPasswordChange = (event) => {
    ctx.setVerifyPassword(event.target.value)
  }

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      if (ctx.password === ctx.verifyPassword) {
        const newUser = {
          name: ctx.name,
          email: ctx.email,
          password: ctx.password,
        }

        let requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser)
        }

        let res = await fetch("http://localhost:5000/users", requestOptions)


        const existingUser = {
          email: ctx.email,
          password: ctx.password,
        }

        requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(existingUser)
        }

        res = await fetch("http://localhost:5000/login", requestOptions)

        console.log('res......', res.ok)
        if (res.ok) {
          ctx.setAuth(true)
          ctx.setToken(res)

          history.push('/shop')
        } else {
          throw 'bye bye'
        }

      } else {
        console.log("Passwords do not match. Please try again")
      }

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div>Signup
      <Link to="/login">Already have an account? Sign in here</Link>
      <form>
        <input placeholder="Username" onChange={handleNameChange} /><br />
        <input placeholder="Email" onChange={handleEmailChange} /><br />
        <input type='password' placeholder="Password" onChange={handlePasswordChange} /><br />
        <input type='password' placeholder="Verify Password" onChange={handleVerifyPasswordChange} /><br />
        <button onClick={handleSignupSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Signup
