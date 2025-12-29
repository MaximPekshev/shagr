
import styles from './mobileCategoriesList.module.css';
import { Drawer, Menu, Divider } from 'antd';
import { useGetCategoriesQuery } from '../../redux/services/api';
import { NavLink } from 'react-router';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

export const MobileCategoriesList = () => {
    const { data: categories } = useGetCategoriesQuery();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const categoriesItems = categories?.categories.map(category => ({
        key: category.slug,
        label: (
                <NavLink 
                    to={`/catalog/?category=${category.slug}`}
                    onClick={() => setIsDrawerVisible(false)}
                >
                    {category.name}
                </NavLink>
            ),
        children: category.subcategories?.map(subcategory => ({
            key: subcategory.slug,
            label: (
                <NavLink 
                    to={`/catalog/?category=${subcategory.slug}`}
                    onClick={() => setIsDrawerVisible(false)}
                >
                    {subcategory.name}
                </NavLink>
            )
        }))
    })) || [];
    return (
        <>
            <div className={styles.mobileCategoriesWrapper}>
                <button 
                    className={styles.categoryButton}
                    onClick={() => setIsDrawerVisible(true)}
                >
                    Категории
                </button>
                <Divider className={styles.divider} />
            </div>
            <Drawer
                closeIcon={null}
                open={isDrawerVisible}
                placement="left"
                styles={{
                    body: { padding: 16 },
                    header: {
                        paddingBottom: 0,
                    }
                }}
            >
                <div className={styles.drawerWrapper}>
                    <div className={styles.drawerTop}>
                        <h2 className={styles.drawerTitle}>Категории</h2>
                        <button 
                            className={styles.closeButton}
                            onClick={() => setIsDrawerVisible(false)}
                        >
                            <CloseOutlined />
                        </button>
                    </div>
                    <Divider className={styles.divider} />
                    <Menu
                        mode="inline"
                        items={categoriesItems}
                    />
                </div>
            </Drawer>
        </>
    );
}