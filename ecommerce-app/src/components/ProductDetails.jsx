import React from 'react';

const ProductDetails = ({ product, addToCart }) => {
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl text-gray-700 mb-2">${product.price.toFixed(2)}</p>
        <p className="mb-4">{product.description}</p>
        <button
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
