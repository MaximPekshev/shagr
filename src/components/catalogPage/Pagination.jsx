import { Pagination } from 'antd';
import styles from './pagination.module.css';
export const CatalogPagination = () => {
    return (
        <div className={styles.pagination}>
            <Pagination
                showSizeChanger={false}
                defaultCurrent={1}
                total={500}
            />
        </div>
        
    );
}