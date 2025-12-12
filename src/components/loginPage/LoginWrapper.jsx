import styles from './loginWrapper.module.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { useLoginForm } from './useLoginForm';
export const LoginWrapper = () => {
    const { form, setEmail, setPin } = useLoginForm();
    const { email, pin } = form;

    const isValidEmail = (value) => {
        if (typeof value !== 'string') return false;
        const email = value.trim();
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    };

    const onFinish = ({e, values}) => {
        e.preventDefault();
        console.log('Success:', values);
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
        <div className={styles.loginWrapper}>
            <form className={styles.loginForm} onSubmit={(e) => onFinish({e, values: {email, pin}})}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <Input 
                        className={styles.emailInput}
                        value={email}
                        placeholder="email" 
                        size='large'
                        onChange={(event) => setEmail(event.target.value)}
                        status={email && !isValidEmail(email) ? 'error' : ''}
                    />
                    {/* <Input.OTP 
                        className={styles.pinInput}
                        value={pin}
                        length={6}
                        size='large' 
                        formatter={str => str.toUpperCase()} 
                        {...sharedProps}
                    /> */}
                </div>
                <button type="submit" className={styles.loginButton}>
                    Submit
                </button>
            </form>
        </div>
    );
}