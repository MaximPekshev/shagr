
import { useState } from "react";
import { Modal } from "antd";
import styles from './answerModal.module.css';
export const AnswerModal = ({title, description, isOpen, onClose}) => {
    const [opened, setOpened] = useState(isOpen);
    return (
        <Modal
            centered
            title=""
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={opened}
            onOk={() => setOpened(false)}
            width={640}
            footer={[
            ]}
        >
            <div className={ styles.modalWrapper}>
                <div className={ styles.dialogWrapper }>
                    <div className={ styles.dialogBody }>
                        <h2 className={ styles.title }>{title}</h2>
                        <p className={ styles.text }>{description}</p>
                        <button
                            className={ styles.confirmButton }
                            onClick={() => { setOpened(false); onClose ? onClose() : null; }}
                        >
                            ОК
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}