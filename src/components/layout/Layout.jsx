import { Outlet, NavLink, useLocation } from "react-router";
import { Flex, Layout   } from 'antd';
import { Menu } from 'antd';
import styles from './layout.module.css';
import logo from '../../assets/img/logo/logo.png';
import { MenuOutlined } from '@ant-design/icons';
import { MobileMenu } from "../mobileMenu/MobileMenu";
import { useState } from "react";

const { Header, Footer, Content } = Layout;

export const MainLayout = () => {
    const location = useLocation();
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

    const getCurrentKey = (path) => {
        if (path === '/') return '1';
        if (path === '/catalog') return '2';
        if (path === '/contacts') return '3';
        return '';
    };

    const currentKey = getCurrentKey(location.pathname);

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    return (
        <Flex gap="middle" wrap>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <div className={styles.logo}>
                        <NavLink to="/">
                            <img src={logo} alt="Logo" />
                        </NavLink>
                    </div>
                    <Menu
                        className={styles.menu}
                        mode="horizontal"
                        selectedKeys={[currentKey]}
                        items={[
                        { key: '1', label: (
                            <NavLink to="/">
                                Home
                            </NavLink>
                            ) },
                        { key: '2', label: (
                            <NavLink to="/catalog">
                                Catalog
                            </NavLink>
                            ) },
                        { key: '3', label: (
                            <NavLink to="/contacts">
                                Contacts
                            </NavLink>
                            ) },
                        ]}
                    />
                    <div className={styles.userActions}>
                        <NavLink to="/login" className={styles.loginButton}>Login</NavLink>
                    </div>
                    <div className={styles.hamburgerMenu}>
                        <button onClick={() => toggleMobileMenu()} className={styles.mobileMenuButton}>
                            <MenuOutlined />
                        </button>
                    </div>
                    <MobileMenu visible={mobileMenuVisible} onClose={toggleMobileMenu} />
                </Header>
                <Content className={styles.content}>
                    <Outlet />
                </Content>
                <Footer className={styles.footer}>
                    <p>© 2025 e-commerce application. All rights reserved.</p>
                </Footer>
            </Layout>
        </Flex>
        )
    }