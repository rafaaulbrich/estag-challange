import styles from './InputSmaller.module.css';

function InputSmaller({type, placeholder, value}) {
    return (
        <div className={`${styles.input}`}>
            <input type={type} placeholder={placeholder} value={value} />
        </div>
    )
}

export default InputSmaller