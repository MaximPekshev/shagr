import { Outlet, NavLink} from "react-router";
import { Flex, Layout   } from 'antd';
import { Menu } from 'antd';
import styles from './layout.module.css';
import logo from '../../assets/img/logo/logo.png';

const { Header, Footer, Content } = Layout;

export const MainLayout = () => {
  return (
    <Flex gap="middle" wrap>
        <Layout className={styles.layout}>
            <Header className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} alt="Logo" />
                </div>
                <Menu
                    className={styles.menu}
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
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