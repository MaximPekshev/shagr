import { Modal } from 'antd';
import styles from './modal.module.css';

export const ModalComponent = ({ isOpen, onClose, handleOk, title, description }) => {

    if (!isOpen) return null;

    return (
        <Modal
            title=""
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpen}
            onOk={handleOk}
            onCancel={onClose}
        >
            <div className={styles.modalContent}>
                <h2>{title}</h2>
                { description && <p className={styles.modalDescription}>{description}</p> }
            </div>
        </Modal>
    );
}