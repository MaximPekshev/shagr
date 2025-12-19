import { Outlet } from "react-router";
import { Flex, Layout } from 'antd';
import styles from './layout.module.css';
import { HeaderComponent } from "../header/Header";

const { Footer, Content } = Layout;

export const MainLayout = () => {
    return (
        <Flex gap="middle" wrap>
            <Layout className={styles.layout}>
                <HeaderComponent />
                <Content className={styles.content}>
                    <Outlet />
                </Content>
                <Footer className={styles.footer}>
                    <p>© 2025 e-commerce приложение. Все права защищены.</p>
                </Footer>
            </Layout>
        </Flex>
        )
    }