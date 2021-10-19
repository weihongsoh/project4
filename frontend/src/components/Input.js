import React, { useContext } from 'react'
import UserContext from '../context/user-context'

const Input = () => {
  const ctx = useContext(UserContext)
  // console.log(ctx)

  const handleChange = (event) => {
    ctx.setInput(event.target.value)
  }

  const handleClick = (event) => {
    ctx.setSearch(ctx.input)
  }

  return (
    <div>
      <form onClick={handleClick} >
        <input placeholder='Search games and systems' onChange={handleChange} ></input>
      </form>
    </div>
  )
}

export default Input
