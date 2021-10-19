import React, { useContext } from 'react'
import UserContext from '../context/user-context'

const Cart = () => {
  const ctx = useContext(UserContext)

  const handleRemoveFromCart = (element) => {
    // ctx.setCart((prevState) => [...prevState, element.target.name])
    const newCart = [...ctx.cart];
    newCart.splice(element.target.id, 1);
    ctx.setCart(newCart);
  }

  const handleCheckout = async (event) => {
    event.preventDefault()

    // const newOrder = {
    //   uuid: 1122,
    //   name: 12,
    //   price: 34,
    //   quantity: 56,
    //   subtotal: 78,
    //   // total: 90,
    //   // 1 new column for purchase_id
    // }

    console.log(123)
    console.log(ctx.cart)

    let obj = {}
    for (let i = 0; i < ctx.cart.length; i++) {
      // console.log(ctx.cart.length)
      // const item = { ctx.cart[i].id: ctx.cart[i] }
      // obj.push(item)
      obj.push(ctx.cart[i])
    }
    console.log(obj)

    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   // body: JSON.stringify(newOrder)
    //   body: JSON.stringify(ctx.cart)
    // }

    // const res = await fetch("http://127.0.0.1:5000/orders", requestOptions)

    // ctx.setCart("")
  }

  // const seeElement = () => {
  //   ctx.cart.map((element, index) => {
  //     console.log(JSON.stringify(index, element))
  //     console.log(element)
  //   })
  // }

  // seeElement()

  return (
    <div>
      Shopping Cart

      {ctx.cart && ctx.cart.map((element, index) => {
        return (
          <div key={index} id={index}>
            <div key={index} id={index}>
              <button id={index} onClick={handleRemoveFromCart}>Remove Item</button>{element.name}
            </div>
          </div>
        )
      })}
      <div>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart
