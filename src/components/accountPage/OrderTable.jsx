import { Table } from 'antd';
import { NavLink } from 'react-router';


export const OrderTable = ({ items }) => {
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
        status: order.status.name
    }));

    return (
        <Table 
            columns={columns}
            dataSource={data}
        />
    );
}