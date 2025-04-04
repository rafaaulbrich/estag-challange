import styles from './Layout.module.css';
import { Outlet } from 'react-router';
import Aside from '../components/aside/Aside';
function Layout() {
    return (
        <>
            <Aside />
            <div className={`${styles.layout}`}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout