import { NavLink } from 'react-router';
import styles from './wishlistWrapper.module.css';

export const WishlistWrapper = () => {
    const token = localStorage.getItem('shagr_token');
    return (
        <div className={styles.cartWrapper}>
            { token ? (
                <h1>Избранное</h1>
            ) : (
                <>
                    <h1>Пожалуйста авторизуйтесь, чтобы просмотреть ваше избранное.</h1>
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
