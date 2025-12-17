import styles from './loginWrapper.module.css';
import { Input, Spin } from 'antd';
import { useLoginForm } from './useLoginForm';
import { useRequestPinMutation, useGetTokenMutation } from '../../redux/services/auth';
import { AnswerModal } from '../answerModal/AnswerModal';
import { useNavigate } from 'react-router';
export const LoginWrapper = () => {
    const { form, setEmail, setPin, clearForm } = useLoginForm();
    const { email, pin } = form;
    const navigate = useNavigate();

    const [ requestPin, { 
        isLoading: isPinLoading, 
        isSuccess: isPinSuccess, 
        isError: isPinError 
    }] = useRequestPinMutation();

    const [ getToken, { 
        isLoading: isTokenLoading, 
        isSuccess: isTokenSuccess, 
        isError: isTokenError 
    }] = useGetTokenMutation();

    const isValidEmail = (value) => {
        if (typeof value !== 'string') return false;
        const email = value.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    };

    const handleFormSubmit = ({e, values}) => {
        e.preventDefault();
        // validate and normalize input before request
        const normalizedEmail = typeof values?.email === 'string' ? values.email.trim() : '';
        const normalizedPin = values?.pin != null ? String(values.pin).replace(/\D+/g, '').slice(0, 6) : '';

        values.email = normalizedEmail;
        values.pin = normalizedPin;

        if (!isPinSuccess) {
            if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
                return;
            }
        } else {
            if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
                return;
            }
            if (!/^\d{6}$/.test(normalizedPin)) {
                return;
            }
        }
        if (!isPinSuccess) {
            requestPin(values.email);
        } else {
            getToken({ email: values.email, pin: values.pin });
        }
    };
    const onChange = text => {
        setPin(text);
    };
    const onInput = value => {
        let cleaned = value.toString().replace(/\D+/g, '');
        setPin(cleaned);
    };
    const sharedProps = {
        onChange,
        onInput,
    };
    return (
        <>
            {isPinError && 
                <AnswerModal 
                    title="Ошибка!"
                    description="Ошибка получения кода" 
                    isOpen={isPinError}
                />
            }
            {isTokenError && 
                <AnswerModal 
                    title="Ошибка!"
                    description="Не верный код или email" 
                    isOpen={isTokenError}
                />
            }
            {isTokenSuccess && 
                <AnswerModal 
                    title="Спасибо!"
                    description="Вы успешно вошли в систему" 
                    isOpen={isTokenSuccess}
                    onClose={() => {clearForm(); navigate('/', { replace: true });}}
                />
            }
            <div className={styles.loginWrapper}>
                <form className={styles.loginForm} onSubmit={(e) => handleFormSubmit({e, values: {email, pin}})}>
                    <h2>Авторизация</h2>
                    <div className={styles.inputGroup}>
                        <div className={`${isPinSuccess ? styles.hide : ''}`}>
                            <Input 
                                className={styles.emailInput}
                                value={email}
                                placeholder="email" 
                                size='large'
                                onChange={(event) => setEmail(event.target.value)}
                                status={email && !isValidEmail(email) ? 'error' : ''}
                            /> 
                        </div>
                        <div className={`${!isPinSuccess ? styles.hide : ''}`}>
                            <Input.OTP 
                                className={styles.pinInput}
                                value={pin}
                                length={6}
                                size='large' 
                                formatter={str => str.toUpperCase()} 
                                {...sharedProps}
                            />
                        </div>
                    </div>
                    { isPinLoading || isTokenLoading ? (
                        <button type="submit" className={styles.loginButton}>
                            <Spin />
                        </button>
                    ) : (
                        <button type="submit" className={styles.loginButton}>
                            Отправить
                        </button>
                    ) }
                </form>
            </div>
        </>
    );
}