import { NavLink } from 'react-router';
import styles from './cartWrapper.module.css';

export const CartWrapper = () => {
    const token = localStorage.getItem('shagr_token');
    return (
        <div className={styles.cartWrapper}>
            { token ? (
                <h1>Корзина</h1>
            ) : (
                <>
                    <h1>Пожалуйста авторизуйтесь, чтобы просмотреть вашу корзину.</h1>
                    <div className={styles.loginContainer}>
                        <NavLink 
                            to="/login" 
                            className={styles.loginButton}
                        >
                            Войти
                        </NavLink>
                    </div>
                </>
            )}
        </div>
    );
}
