import { Table } from 'antd';
import styles from './orderItemInfo.module.css';


export const OrderItemInfo = ({ orderItems }) => {
    const columns = [
        {   
            title : '№', 
            dataIndex: 'index', 
            key: 'index' 
        },
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
    const data = orderItems?.map((item, index) => (
        {
            key: item.good.slug,
            index: index + 1,
            title: item.good.name,
            art: item.good.art,
            unit: item.good.okei,
            price: item.price_without_vat.toFixed(2),
            quantity: item.quantity,
            total: item.amount_without_vat.toFixed(2),
        }
    ));

    const totalAmount = orderItems?.reduce((sum, item) => sum + item.amount_without_vat, 0).toFixed(2);

    return (
        <>
            <Table 
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <div className={styles.totalAmount}>
                <span>Итого:</span> <span>{totalAmount}</span>
            </div>
        </>
    );
}