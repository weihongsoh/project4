import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import UserContext from '../context/user-context'

const Item = () => {
  const ctx = useContext(UserContext)
  const history = useHistory()
  const params = useParams()

  const handleBackToHome = () => {
    history.push('/shop')
  }

  const handleAddToCart = (element) => {
    console.log('Added to Cart: ', element.target.name)

    const productID = ctx.productsArray[element.target.value - 1]
    ctx.setCart((prevState) => [...prevState, productID])
  }

  const handleDeleteProduct = async (event) => {
    event.preventDefault();

    const deleteItem = {
      id: event.target.value,
    }

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteItem)
    }

    const res = await fetch("http://localhost:5000/products", requestOptions)

    history.push('/shop')

    console.log('Product deleted')
  }

  const productSingle = ctx.productsArray[params.item]

  return (

    <div>
      <button type='button' className='btn btn-primary' onClick={handleBackToHome}>Back to Home</button>
      <div>
        <div>
          <img width='500' src={productSingle.image} alt={productSingle.name} />
        </div>

        {ctx.role === 1 ? (
          <div>
            <button type='button' className='btn btn-danger btn-sm' value={productSingle.id} onClick={handleDeleteProduct}>Delete Product</button><br />
          </div>) : (
          <div>
            <button className='btn btn-warning' type='button' name={productSingle.name} value={productSingle.id} onClick={handleAddToCart}>Add to Cart</button><br />
          </div>
        )}

        <div>
          <div className='fs-5 fw-bold' style={{ color: 'blue' }}>
            USD ${productSingle.price}
          </div>
          <div style={{ color: 'white' }} className='fs-5 fw-bold'>
            {productSingle.name}
          </div>
          <div style={{ color: 'white' }}>
            {productSingle.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
