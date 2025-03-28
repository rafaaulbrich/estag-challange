import Routers from '../../index';
import styles from './Aside.module.css';
// import logo from './logo.svg';

function Aside() {
    return (
        // <div className="App">
        //       <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //       </header>
        // </div>
        <aside className={`${styles.aside}`}>
            <Routers />
        </aside>
    )
}

export default Aside