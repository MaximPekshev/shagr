import { Pagination } from 'antd';
import styles from './pagination.module.css';

export const CatalogPagination = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {
    
    return (
        <div className={styles.pagination}>
            <Pagination
                onChange={onPageChange}
                showSizeChanger={false}
                current={currentPage}
                total={totalItems}
                pageSize={itemsPerPage}
            />
        </div>
        
    );
}