import styles from './Button.module.css';

function Button({ onClick, children }) {
    return (
        <div className={`${styles.button}`}>
            <button onClick={onClick}>{children}</button>
        </div>
    )
}

export default Button