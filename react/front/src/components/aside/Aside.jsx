import styles from './Aside.module.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Aside() {
    return (
        <>
            <aside className={`${styles.aside}`}>
                <ul className={`${styles.ul}`}>
                    <h2><Link to="/" className={`${styles.li}`}>Suite Store</Link></h2>
                    <li className={`${styles.li}`}><Link to="/products" className={`${styles.li}`}>Products</Link></li>
                    <li className={`${styles.li}`}><Link to="/categories" className={`${styles.li}`}>Categories</Link></li>
                    <li className={`${styles.li}`}><Link to="/history" className={`${styles.li}`}>History</Link></li>
                </ul>
            </aside>
        </>
    )
}

export default Aside