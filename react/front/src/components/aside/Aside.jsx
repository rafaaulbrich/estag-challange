import styles from './Aside.module.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import History from '../../components/pages/History';
import Category from '../../components/pages/Category';
import Product from '../../components/pages/Product';

function Aside() {
    return (
        // <div className="App">
        //       <header className="App-header">
        //       </header>
        // </div>
        <aside className={`${styles.aside}`}>
            <Router>
                <ul className={`${styles.ul}`}>
                    <h2><Link to="/" className={`${styles.li}`}>Suite Store</Link></h2>
                    <li className={`${styles.li}`}><Link to="/products" className={`${styles.li}`}>Products</Link></li>
                    <li className={`${styles.li}`}><Link to="/categories" className={`${styles.li}`}>Categories</Link></li>
                    <li className={`${styles.li}`}><Link to="/history" className={`${styles.li}`}>History</Link></li>
                </ul>
                <Routes>
                    <Route exact path="/products" element={<Product />}></Route>
                    <Route exact path="/categories" element={<Category />}></Route>
                    <Route exact path="/history" element={<History />}></Route>
                </Routes>
            </Router>
        </aside>
    )
}

export default Aside