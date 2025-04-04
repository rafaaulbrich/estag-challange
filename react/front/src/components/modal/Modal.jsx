import styles from './Modal.module.css';

const Modal = ({ children, modalOpen, setModalOpen }) => {
    return (
        <>
        {modalOpen && (
            <div className={`${styles.modalContainer}`} onClick={() => setModalOpen(false)}>
                <div className={`${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                    <button className={`${styles.close}`} onClick={() => setModalOpen(false)}>X</button>
                    {children}
                </div>
            </div>
        )}
        </>
    )
}

export default Modal