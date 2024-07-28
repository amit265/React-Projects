import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg">{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-300 rounded"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-300 rounded"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="ml-4 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Total: ${getTotalPrice()}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
