import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import UserContext from '../context/user-context'

const Item = () => {
  const ctx = useContext(UserContext)
  const history = useHistory()
  const params = useParams()

  const handleClick = () => {
    history.push('/')
  }

  const handleAddToCart = (element) => {
    const productID = ctx.productsArray[element.target.value - 1]
    console.log(productID)

    ctx.setCart((prevState) => [...prevState, productID])

    // ctx.setCart((prevState) => [...prevState, element.target.name])
  }

  // ONE SINGLE PRODUCT
  return (
    <div>
      <button onClick={handleClick}>Back to Home</button>
      <div>
        <div>
          <img src={ctx.productsArray[params.item]?.image} alt={ctx.productsArray[params.item]?.name} />
        </div>
        <div>
          {ctx.productsArray[params.item]?.name}
        </div>
        <div>
          {ctx.productsArray[params.item]?.description}
        </div>
        <div>
          USD ${ctx.productsArray[params.item]?.price}
        </div>
        <div>
          <button value={ctx.productsArray[params.item]?.id} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Item
