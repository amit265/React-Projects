import React from 'react'

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="mb-2">${product.price.toFixed(2)}</p>
              <button
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      );
}

export default ProductList
