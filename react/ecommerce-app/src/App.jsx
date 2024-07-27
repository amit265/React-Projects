import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import './index.css';

const products = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150', description: 'Description for product 1' },
  { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/150', description: 'Description for product 2' },
  { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/150', description: 'Description for product 3' },
  { id: 4, name: 'Product 4', price: 39.99, image: 'https://via.placeholder.com/150', description: 'Description for product 4' },
];

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-lg font-bold">E-Commerce</Link>
            <Link to="/cart" className="text-white">Cart ({cart.length})</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList products={products} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetails product={getProductById(parseInt())} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
