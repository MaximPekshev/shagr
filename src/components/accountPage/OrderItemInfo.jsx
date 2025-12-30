import { Table } from 'antd';
import styles from './orderItemInfo.module.css';


export const OrderItemInfo = ({ orderItems }) => {
    const columns = [
        {
            title: 'Наименование',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Артикул',
            dataIndex: 'art',
            key: 'art',
        },
        {
            title: 'Ед. изм.',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Количество',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Сумма',
            dataIndex: 'total',
            key: 'total',
        },
    ];
    const data = orderItems?.map(item => (
        {
            key: item.good.slug,
            title: item.good.name,
            art: item.good.art,
            unit: item.good.okei,
            price: item.price.toFixed(2),
            quantity: item.quantity,
            total: item.amount.toFixed(2),
        }
    ));
    return (
        <>
            <Table 
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <div className={styles.totalAmount}>
                <span>Итого:</span> <span>{orderItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</span>
            </div>
        </>
    );
}