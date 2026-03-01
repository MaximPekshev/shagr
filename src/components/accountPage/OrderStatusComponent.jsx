import styles from './orderStatus.module.css';
import { useState } from 'react';
import { Select, Space } from 'antd';
import { useSetOrderStatusMutation } from '../../redux/services/order';

// import { useSetOrderStatusMutation } from '../../redux/services/order';
export const OrderStatusComponent = ({order, availableStatuses, token}) => {
    const [selectedStatus, setSelectedStatus] = useState({ label: order.status.name, value: order.status.id });
    const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(false);
    const [setOrderStatus, { isLoading: isStatusUpdateLoading }] = useSetOrderStatusMutation();
    
    const allStatuses = availableStatuses?.statuses.map(item => ({ value: item.id, label: item.name })) || [];

    if (!allStatuses.some(status => status.value === order.status.id)) {
        allStatuses.unshift({ label: order.status.name, value: order.status.id });
    };
    
    const handleChange = (value) => {
        if (value === selectedStatus.value) {
            return;
        };
        setSelectedStatus(allStatuses.find(status => status.value === value));
        if ( order.status.id === value) {
            setIsSaveButtonVisible(false);
        } else {
            setIsSaveButtonVisible(true);
        };
    };

    const handleSave = () => {
        setOrderStatus({
            header: { token: token },
            order_id: order.order.id,
            status_id: selectedStatus.value
        }).then(() => {
            setIsSaveButtonVisible(false);
        }).catch((error) => {
            console.error('Ошибка при изменении статуса заказа:', error);
        });
    };

    return (
        <Space className={styles.statusContainer}>
            <Select
                loading={isStatusUpdateLoading}
                onChange={handleChange}
                className={styles.statusSelect}
                value={selectedStatus.value}
                options={allStatuses}
            />
            {isSaveButtonVisible && (
                <button 
                    className={styles.updateButton}
                    onClick={handleSave}
                    disabled={isStatusUpdateLoading}
                >
                    {isStatusUpdateLoading ? 'Сохранение...' : 'Сохранить'}
                </button>
            )}  
        </Space>
    );
}