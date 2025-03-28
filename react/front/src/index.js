import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import History from './components/pages/History';
import Category from './components/pages/Category';
import Product from './components/pages/Product';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function Routers() {
  return (
      <Router>
          <ul>
              <li><Link to="/">Suite Store</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/history">History</Link></li>
          </ul>
      <Routes>
      <Route exact path="/products" element={<Product />}></Route>
      <Route exact path="/categories" element={<Category />}></Route>
      <Route exact path="/history" element={<History />}></Route>
      </Routes>
      </Router>
  )
}

export default Routers;