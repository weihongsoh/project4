import React, { useContext } from 'react'
import UserContext from '../context/user-context'

const Cart = () => {
  const ctx = useContext(UserContext)

  const handleRemoveFromCart = (element) => {
    const newCart = [...ctx.cart];
    newCart.splice(element.target.id, 1);
    ctx.setCart(newCart);
  }

  const handleCheckout = async (event) => {
    event.preventDefault()

    let obj = {}
    for (let i = 0; i < ctx.cart.length; i++) {
      if (obj[`${ctx.cart[i].id}`]) {
        obj[`${ctx.cart[i].id}`].quantity++
        obj[`${ctx.cart[i].id}`].subtotal = obj[`${ctx.cart[i].id}`].quantity * obj[`${ctx.cart[i].id}`].price
      } else {
        obj[`${ctx.cart[i].id}`] = (ctx.cart[i])
        obj[`${ctx.cart[i].id}`].quantity = 1
        obj[`${ctx.cart[i].id}`].subtotal = obj[`${ctx.cart[i].id}`].quantity * obj[`${ctx.cart[i].id}`].price

        obj[`${ctx.cart[i].id}`].email = ctx.email
      }
    }

    const checkout = []
    for (const value of Object.values(obj)) {
      checkout.push(value)
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkout)
    }

    const res = await fetch("http://127.0.0.1:5000/orders", requestOptions)

    ctx.setCart("")
  }

  return (
    <div>

      {ctx.role === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-warning" type="button" onClick={handleCheckout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg> Shopping Cart Checkout</button>
        </div>
      ) : ('')}

      {ctx.cart && ctx.cart.map((element, index) => {
        return (
          <div key={index} id={index} className='' style={{ color: 'white' }}>
            <button type='button' className='btn btn-danger btn-sm' id={index} onClick={handleRemoveFromCart}>Remove Item</button>{element.name}
          </div>
        )
      })}

    </div>
  )
}

export default Cart
