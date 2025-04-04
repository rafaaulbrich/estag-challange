import styles from './ButtonAction.module.css';

function ButtonAction({ onClick, children }) {
    return (
        <div className={`${styles.button}`}>
            <button onClick={onClick}>{children}</button>
        </div>
    )
}

export default ButtonAction