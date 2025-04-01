import styles from './InputSubmit.module.css';

function InputSubmit({type, placeholder, value}) {
    return (
        <div className={`${styles.input}`}>
            <input type={type} placeholder={placeholder} value={value} />
        </div>
    )
}

export default InputSubmit