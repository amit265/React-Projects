import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCard, removeItem } from "../utils/cartSlice";
import CartList from "./CartList";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import FlashMessage from "./FlashMessage";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  // Calculate total price whenever cart items change
  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, item) => {
      const itemPrice = (item.price ? item.price : item.defaultPrice) / 100;
      return total + itemPrice * item.quantity; // Assume each item has a quantity
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [cartItems]); // Recalculate total price when cart items change

  const handleClearCart = () => {
    if(confirm("This will delete everything from your cart, are you sure?")){
    dispatch(clearCard());
    }

  };

  const handlePurchase = () => {
   
    setMessage(
      `Congratulations, Your order is placed, you should receive your package withinn thirty minutes`
    );
    setShowMessage(true);
    dispatch(clearCard());
  };

  // console.log("Cart items:", cartItems);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Your Cart</h1>
      <div className="flex flex-col my-4 border-2 max-w-2xl p-4 mx-auto">
        {cartItems.length === 0 ? (
          <div className="shadow-lg flex flex-col items-center">
            <h1 className="mt-4 p-4">Your cart is empty</h1>
            <Link to={BASE_URL + "/"}>
              <h2 className="p-4 font-bold text-red-600 hover:bg-gray-200 ">
                Go to Restaurant
              </h2>
            </Link>
          </div>
        ) : (
          <div>
            {cartItems.map((res, index) => (
              <CartList
                key={res.id + index}
                data={res}
                updateTotalPrice={setTotalPrice}
              />
            ))}
            <div>
              <h1 className="text-right pr-10 text-2xl font-bold">
                Total: {totalPrice.toFixed(2)}
              </h1>
            </div>
            <div className="flex flex-col text-center">
              <button
                className="bg-green-600 text-white font-bold text-lg p-2 rounded-lg w-6/12 mx-auto mt-2 cursor-pointer"
                onClick={() => handlePurchase()}
              >
                Order Now
              </button>

              <button
                className="bg-red-600 text-white font-bold text-lg p-2 rounded-lg w-6/12 mx-auto mt-2 cursor-pointer"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
            <div>
              <Link to={BASE_URL + "/"}>
                <h2 className="text-center p-4 shadow-lg font-bold text-green-500">
                  Shop more
                </h2>
              </Link>
            </div>
          </div>
        )}
      </div>
      {showMessage && (
        <FlashMessage
          message={message}
          onClose={() => setShowMessage(false)}
        />
      )}
    </div>
  );
};

export default Cart;
