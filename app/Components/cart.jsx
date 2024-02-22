// Cart.js
import React from "react";
const Cart = ({ cartItems }) => {
    
  return (
    <div className="bg-black h-[20%] w-[10%] absolute z-10 top-[1rem] left-10 text-white">
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((data, i) => (
          <div key={i}>
            {data.name}
            {data.price}
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
    
  );
};

export default Cart;
