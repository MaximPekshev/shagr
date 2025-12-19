import { Drawer, Divider, Badge } from "antd";
import { NavLink } from "react-router";
import { CloseOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import styles from './mobileMenu.module.css';
export const MobileMenu = ({ visible, onClose, token, Logout, cart, wishlist }) => {
    return (
        <Drawer
            closeIcon={null}
            open={visible}
            placement="left"
            styles={{
                body: { padding: 16 },
                header: {
                    paddingBottom: 0,
                }
            }}
        >
            <div className={styles.mobile_menu}>
                <div className={styles.mobile_menu_top}>
                    <button 
                        className={styles.mobile_menu_close}
                        onClick={onClose}
                    >
                        <CloseOutlined />
                    </button>
                </div>
                <Divider className={styles.mobile_menu_divider} />
                <div className={styles.mobile_menu_wrapper}>
                    <nav className={styles.mobile_menu_nav}>
                        <NavLink to="/" onClick={onClose}>Домой</NavLink>
                        <NavLink to="/catalog" onClick={onClose}>Каталог</NavLink>
                        <NavLink to="/contacts" onClick={onClose}>Контакты</NavLink>
                    </nav>
                </div>
                <Divider className={styles.mobile_menu_divider} />
                <div className={ styles.userActions } >
                    { token ? (
                        <>
                            <NavLink to="/account" className={ styles.loginButton } onClick={onClose}>Аккаунт</NavLink>
                            <button onClick={() => { Logout(); onClose(); }} className={styles.loginButton}>Выйти</button>
                        </>
                    ) : (
                        <NavLink to="/login" className={ styles.loginButton } onClick={onClose}>Войти</NavLink>
                    ) }
                </div>
                <Divider className={styles.mobile_menu_divider} />
                <div className={ styles.userLinks } >
                    <Badge size="small" count={ cart ? cart.items.length : 0 }>
                        <NavLink onClick={onClose} to="/cart" className={styles.cart}>
                            <ShoppingCartOutlined className={styles.cartIcon} />
                        </NavLink>
                    </Badge>
                    <Badge size="small" count={ wishlist ? wishlist.items.length : 0 }>
                        <NavLink onClick={onClose} to="/wishlist" className={styles.wishlist}>
                            <HeartOutlined className={styles.wishIcon} />
                        </NavLink>
                    </Badge>
                </div>
            </div>
        </Drawer>
    )
}