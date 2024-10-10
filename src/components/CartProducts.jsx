import React from "react";
import useShop from "../ShopContext";
import "../styles.css";

const CartProducts = () => {
  const { products, removeFromCart, total } = useShop();
  const handleRemoveFromCart = (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      removeFromCart(id);
    }
  };

  return (
    <div className="cart-products">
      <h2>Cart Products</h2>
      {products.map((product) => (
        <div className="cart-product">
          <div className="cart-title-img">
            <img src={product.urlImage} alt="" />
            <span>{product.name}</span>
          </div>

          <h5>{product.price}</h5>

          <button
            className="delete"
            onClick={() => handleRemoveFromCart(product)}
          >
            delete
          </button>
        </div>
      ))}

      <div className="total-price">
        {/* <h4>Total Price</h4> */}
        <h2>Total Price : ${total}</h2>
      </div>
    </div>
  );
};

export default CartProducts;
