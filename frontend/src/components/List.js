import React, { useContext, useEffect } from 'react'
import UserContext from '../context/user-context'
import { NavLink } from 'react-router-dom'

const List = () => {
  const ctx = useContext(UserContext)
  // const params = useParams()

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      ctx.setProductsArray(data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  const handleAddToCart = (element) => {
    const productID = ctx.productsArray[element.target.value - 1]
    ctx.setCart((prevState) => [...prevState, productID])
  }

  return (
    <div className='container'>
      <div className='row'>

        {ctx.productsArray && ctx.productsArray.map((element, index) => {
          return (
            <div key={index} id={index} className='col'>

              <NavLink to={`/${index}`}>
                <div className='row'>
                  <img src={element.image} alt={element.name} />
                </div>
                <div className='align-self-end'>
                  <div className='text-center fs-6 fw-bold'>
                    {element.name}
                  </div>
                  <div className='text-center fs-6 fw-bold'>
                    USD ${element.price}
                  </div>
                </div>
              </NavLink>

              {ctx.role === 0 ? (
                <div className='container'>
                  <div style={{ textAlign: 'center' }} className='textAlign vertical-center'>
                    <button className="btn btn-warning" type="button" id={index} name={element.name} value={element.id} onClick={handleAddToCart}>Add to Cart</button>
                  </div><br /><br />
                </div>) : ('')}

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
