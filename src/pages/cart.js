import React from 'react'
import CartProducts from '../components/CartProducts'
import Payment from '../components/Payment'
import useShop from '../ShopContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const {products} = useShop();

  if(products.length <= 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <p>Start adding products to your cart by navigating to the home page. <Link to="/">Back</Link></p>
      
      </div>
    )
  }
  return (
    <div className='cart-container'>
        <CartProducts/>
        <Payment />
    </div>
  )
}

export default Cart