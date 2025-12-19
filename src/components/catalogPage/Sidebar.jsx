import styles from './sidebar.module.css';
import { Menu } from 'antd';
import { useGetCategoriesQuery } from '../../redux/services/api';
import { NavLink } from 'react-router';
export const Sidebar = ({ categorySlug }) => {

    const { data: categories } = useGetCategoriesQuery();

    const categoriesItems = categories?.categories.map(category => ({
        key: category.slug,
        label: (
                <NavLink 
                    to={`/catalog/?category=${category.slug}`}
                >
                    {category.name}
                </NavLink>
            ),
        children: category.subcategories?.map(subcategory => ({
            key: subcategory.slug,
            label: (
                <NavLink 
                    to={`/catalog/?category=${subcategory.slug}`}
                >
                    {subcategory.name}
                </NavLink>
            )
        }))
    })) || [];

    return (
        <div className={styles.sidebar}>
            <h2>Категории</h2>
            <Menu
                mode="inline"
                selectedKeys={[categorySlug || '']}
                // defaultSelectedKeys={['231']}
                // openKeys={stateOpenKeys}
                // onOpenChange={onOpenChange}
                // style={{ width: 256 }}
                items={categoriesItems}
            />
        </div>
    );
}