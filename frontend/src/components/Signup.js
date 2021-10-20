import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
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

    if (ctx.password === ctx.verifyPassword) {
      const newUser = {
        name: ctx.name,
        email: ctx.email,
        password: ctx.password,
      }

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      }

      const res = await fetch("http://localhost:5000/users", requestOptions)

      history.push('/login')

    } else {
      console.log("Passwords do not match. Please try again")
    }

  }

  return (
    <div>Signup
      <form>
        <input placeholder="Username" onChange={handleNameChange} /><br />
        <input placeholder="Email" onChange={handleEmailChange} /><br />
        <input placeholder="Password" onChange={handlePasswordChange} /><br />
        <input placeholder="Verify Password" onChange={handleVerifyPasswordChange} /><br />
        <button onClick={handleSignupSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Signup
