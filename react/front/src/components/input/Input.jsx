import styles from './Input.module.css';

function Input({type, placeholder, onChange, value }) {
    return (
        <div className={`${styles.input}`}>
            <input type={type} placeholder={placeholder} onChange={onChange} value={value} />
        </div>
    )
}

export default Input