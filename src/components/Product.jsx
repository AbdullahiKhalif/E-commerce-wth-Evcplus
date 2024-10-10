import useShop from '../ShopContext'
import { useState, useEffect } from "react";

const Product = ({product}) => {
  const {addToCart, products, total, removeFromCart} = useShop();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const isCart = products.filter(pro => product.id === pro.id);
    if(isCart.length > 0) {
      setIsInCart(true);
    }else{
      setIsInCart(false);
    }
  }, [products])
  const handleClick = () => {
    if(isInCart) {
      removeFromCart(product);
    }
    else{
      addToCart(product);
    }
  
  }
  return (
    <div className='card' style={{ minHeight: "100%",
        background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0, 0.1)), url(${product.urlImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",}}>
        <div className="info">
            <span>{product.name}</span>
            <span className='price'>${product.price}</span>
        </div>

        <button className={`btn ${isInCart ? "btn-secondary" : "btn-primary"}`} onClick={handleClick}>
          {isInCart ? "-" : "+"}
        </button>
    </div>
  )
}

export default Product