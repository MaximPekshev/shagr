import { Table, Space, Select } from 'antd';
import { NavLink } from 'react-router';
import { OrderItemInfo } from './OrderItemInfo';
import { OrderStatusComponent } from './OrderStatusComponent';

export const OrderTable = ({ items, availableStatuses }) => {
    const token = localStorage.getItem('shagr_token');
    const columns = [
        {
            title: 'Заказ',
            dataIndex: 'order',
            key: 'order',
            render: (_, record) => (
                <NavLink 
                    disabled={items.length === 0}
                >
                   № {record.order.number} от {new Date(record.order.date).toLocaleDateString()}
                </NavLink>
            ),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {    
                return (
                    <OrderStatusComponent 
                        order={record}
                        availableStatuses={availableStatuses}
                        token={token}
                    />
                );
            },
        },
        {
            title: 'Клиент',
            dataIndex: 'client',
            key: 'client'
            ,
        }
        
    ];

    const data = items?.orders.map(order => ({
        key: order.id,
        order: order,
        client: order.client.name,
        status: order.status,
        items: order.items,
    }));

    return (
        <div className="orderItemsContainer">
            <Table 
                columns={columns}
                dataSource={data}
                expandable={{
                    expandedRowRender: record => (
                        <OrderItemInfo orderItems={record.items} />
                    ),
                    rowExpandable: record => record.items.length > 0,
                }}
            />
        </div>
    );
}