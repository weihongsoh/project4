import React, { useContext, useEffect } from 'react'
import UserContext from '../context/user-context'
import { NavLink } from 'react-router-dom'

const Tile = () => {
  const ctx = useContext(UserContext)
  // const params = useParams()

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      ctx.setProductsArray(data)

      // converting from array of objects to object of objects
      // let obj
      // for (let i = 0; i < ctx.productsArray.length; i++) {
      //   const item = ctx.productsArray[i].id
      //   console.log('item', item)
      //   obj.push(item)
      // }


    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  const handleAddToCart = (element) => {
    // console.log('element', element.target)
    // itemID here
    // console.log('target', element.target.value)




    const productID = ctx.productsArray[element.target.value - 1]
    // console.log(JSON.stringify(ctx.products))
    // console.log('ctx', ctx.products[productID - 1])
    console.log(productID)

    ctx.setCart((prevState) => [...prevState, productID])
    // console.log('element', element.target)
    // console.log('type', typeof (element.target.notname))
  }

  // WHOLE LIST OF PRODUCTSSS
  return (
    <div>
      {ctx.productsArray && ctx.productsArray.map((element, index) => {
        return (
          <div key={index} id={index} className='column'>
            <NavLink to={`/${index}`}>
              <div className='row-sm-4'>
                <img src={element.image} width='200' alt={element.name} />
              </div>
              <div className='row-sm-4'>
                {element.name}
              </div>
              <div className='row-sm-4'>
                USD ${element.price}
              </div>
            </NavLink>
            <button id={index} value={element.id} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )
      })}
    </div>
  )
}

export default Tile
