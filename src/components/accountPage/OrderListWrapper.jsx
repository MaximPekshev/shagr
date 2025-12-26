import styles from './orderListWrapper.module.css';
import { useGetActiveOrdersQuery, useGetClosedOrdersQuery } from '../../redux/services/order';
import { Tabs } from 'antd';
import { OrderTable } from './OrderTable';  

export const OrderListWrapper = () => {
    const token = localStorage.getItem('shagr_token');
    const { data: activeOrders, isLoading: isActiveLoading, isFetching: isActiveFetching } = useGetActiveOrdersQuery({ header: { token: token } });
    const { data: closedOrders, isLoading: isClosedLoading, isFetching: isClosedFetching } = useGetClosedOrdersQuery({ header: { token: token } });

    const tabItems = [
        {
            key: '1',
            label: `Активные заказы`,
            children: ( 
                <OrderTable 
                    items={activeOrders} 
                    isLoading={isActiveLoading || isActiveFetching} 
                />
            )
        },
        {
            key: '2',
            label: `Закрытые заказы`,
            children: (
                <OrderTable 
                    items={closedOrders} 
                    isLoading={isClosedLoading || isClosedFetching} 
                />
            )
        }
    ];

    return (
        <>
        <div className={styles.orderListWrapper}>
            { token ? (
                <div className={styles.tableContainer}>
                    <Tabs defaultActiveKey="1" items={tabItems} />
                    {/* { isLoading || isFetching ? (
                        <p>Загрузка заказов...</p>
                    ) : error ? (
                        <p>Ошибка при загрузке заказов.</p>
                    ) : orders && orders.orders.length > 0 ? (
                        
                    ) : (
                        <p>Нет заказов для отображения.</p>
                    )} */}
                </div>
            ) : (
                <div className="content-wrapper">
                    <h1>Пожалуйста, войдите, чтобы получить доступ к вашему личному кабинету.</h1>
                </div>
            )}
        </div>

        </>
    );
}