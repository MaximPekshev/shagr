import { Drawer, Divider } from "antd";
import { NavLink } from "react-router";
import { CloseOutlined } from '@ant-design/icons';
import styles from './mobileMenu.module.css';
export const MobileMenu = ({ visible, onClose }) => {
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
                        <NavLink to="/" onClick={onClose}>Home</NavLink>
                        <NavLink to="/catalog" onClick={onClose}>Catalog</NavLink>
                        <NavLink to="/contacts" onClick={onClose}>Contacts</NavLink>
                    </nav>
                </div>
                <Divider className={styles.mobile_menu_divider} />
                <div className={ styles.userActions } >
                    <button className={ styles.loginButton } onClick={onClose}>Login</button>
                    <span>|</span>
                    <button className={ styles.signupButton } onClick={onClose}>Sign Up</button>
                </div>
            </div>
        </Drawer>
    )
}