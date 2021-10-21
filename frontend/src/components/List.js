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
    // console.log('Added to Cart: ', element.target.name)

    const productID = ctx.productsArray[element.target.value - 1]
    // console.log(JSON.stringify(ctx.products))
    // console.log('ctx', ctx.products[productID - 1])
    console.log('pid', productID)

    ctx.setCart((prevState) => [...prevState, productID])
    // console.log('element', element.target)
    // console.log('type', typeof (element.target.notname))
  }




  // WHOLE LIST OF PRODUCTSSS
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
