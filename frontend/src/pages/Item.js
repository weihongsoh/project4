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
  // ONE SINGLE PRODUCT
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



// const handleEditName = (event) => {
//   ctx.setEditName(event.target.value)
// }

// const handleEditImage = (event) => {
//   ctx.setEditImage(event.target.value)
// }

// const handleEditPrice = (event) => {
//   ctx.setEditPrice(event.target.value)
// }

// const handleEditDescription = (event) => {
//   ctx.setEditDescription(event.target.value)
// }

// const handleEditProduct = async (event) => {
//   event.preventDefault();

//   const updateItem = {
//     id: event.target.value,
//     name: ctx.editName,
//     image: ctx.editImage,
//     description: ctx.editDescription,
//     price: ctx.editPrice
//   }

//   const requestOptions = {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updateItem)
//   }

//   const res = await fetch("http://localhost:5000/products", requestOptions)

//   history.push('/shop')

//   console.log('Product edited')
// }


// // ONE SINGLE PRODUCT
// return (
//   <div>
//     <button onClick={handleBackToHome}>Back to Home</button>
//     <div>
//       <div>
//         <img src={productSingle.image} alt={productSingle.name} />
//       </div>

//       {ctx.role === 0 ? (
//         <div>
//           <button value={productSingle.id} onClick={handleEditProduct}>Save Changes</button>
//         </div>) : (
//         <div>
//           <button name={productSingle.name} value={productSingle.id} onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//       )}

//       {ctx.role === 1 ? (
//         <div>
//           <div>
//             {productSingle.name}
//           </div>
//           <div>
//             {productSingle.description}
//           </div>
//           <div>
//             USD ${productSingle.price}
//           </div>
//         </div>) : (
//         <form>
//           Name <input defaultValue={productSingle.name} onChange={handleEditName} /><br />
//           Image Link <input defaultValue={productSingle.image} onChange={handleEditImage} /><br />
//           USD $<input defaultValue={productSingle.price} onChange={handleEditPrice} /><br />
//           Description<br /><textarea style={{ width: 500, height: 500, overflowWrap: 'break-word' }} defaultValue={productSingle.description} onChange={handleEditDescription} ></textarea>
//         </form>)}


//     </div>
//   </div>
// )
//           }

// export default Item
