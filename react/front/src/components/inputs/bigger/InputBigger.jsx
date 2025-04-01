import styles from './InputBigger.module.css';

function InputBigger({type, placeholder, value}) {
    return (
        <div className={`${styles.input}`}>
            <input type={type} placeholder={placeholder} value={value} />
        </div>
    )
}

export default InputBigger