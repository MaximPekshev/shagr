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
            title: 'Количество',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Ед. изм.',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Цена без НДС',
            dataIndex: 'price_without_vat',
            key: 'price_without_vat',
        },
        {
            title: 'Сумма без НДС',
            dataIndex: 'total_without_vat',
            key: 'total_without_vat',
        },
        {
            title: 'Ставка НДС',
            dataIndex: 'vat_rate',
            key: 'vat_rate',
        },
        {
            title: 'НДС',
            dataIndex: 'vat',
            key: 'vat',
        },
        {
            title: 'Сумма с НДС',
            dataIndex: 'total_with_vat',
            key: 'total_with_vat',
        },
    ];
    const data = orderItems?.map((item, index) => (
        {
            key: item.good.slug,
            index: index + 1,
            title: item.good.name,
            quantity: item.quantity,
            unit: item.good.okei,
            price_without_vat: item.price_without_vat.toFixed(2),
            total_without_vat: item.amount_without_vat.toFixed(2),
            vat_rate: item.vat ? `${item.vat}%` : '',
            vat: (item.amount - item.amount_without_vat).toFixed(2),
            total_with_vat: item.amount.toFixed(2),
        }
    ));

    const totalAmountWithoutVAT = orderItems?.reduce((sum, item) => sum + item.amount_without_vat, 0).toFixed(2);
    const totalAmountWithVAT = orderItems?.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
    
    return (
        <>
            <Table 
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <div className={styles.totalAmount}>
                <span className={styles.totalLabel}>Итого:</span> <span className={styles.totalValue}>{totalAmountWithoutVAT}</span>
            </div>
            <div className={styles.totalAmount}>
                <span className={styles.totalLabel}>Итого с НДС:</span> <span className={styles.totalValue}>{totalAmountWithVAT}</span>
            </div>
        </>
    );
}