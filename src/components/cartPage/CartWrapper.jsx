import { NavLink } from 'react-router';
import styles from './cartWrapper.module.css';
import { Space, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useGetCartQuery, useDeleteCartItemMutation } from '../../redux/services/cart';

export const CartWrapper = () => {
    const token = localStorage.getItem('shagr_token');
    const { data: cart, error, isLoading, isFetching } = useGetCartQuery({ header: { token: token } });
    const [deleteCartItem, { isLoading: isDeleteCartItemLoading, isFetching: isDeleteCartItemFetching }] = useDeleteCartItemMutation();
    
    const delCartItem = (item) => {
        deleteCartItem({ header: { token: token }, item: { good_slug: item.key, quantity: item.quantity } });
    };

    const columns = [
        {
            title: 'Товар',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <NavLink 
                    to={`/catalog/${record.key}`}
                >
                    {record.title}
                </NavLink>
            ),
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
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button 
                        className={styles.deleteButton} 
                        onClick={() => delCartItem(record)}
                    >
                        <CloseOutlined />
                    </button>
                </Space>
            ),
        },
    ];

    const data = cart?.items.map(item => (
        {
            key: item.good.slug,
            title: item.good.name,
            price: item.price,
            quantity: item.quantity,
            total: item.amount,
        }
    ));

    return (
        <div className={styles.cartWrapper}>
            { token ? (
                <>                
                    <h1>Корзина</h1>
                    { isLoading || isFetching ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Ошибка загрузки корзины.</p>
                    ) : !cart || cart.items.length === 0 ? (
                        <p>Ваша корзина пуста.</p>
                    ) : (
                        <Table columns={columns} dataSource={data} />
                    )}
                </>
            ) : (
                <>
                    <h1>Пожалуйста авторизуйтесь, чтобы просмотреть вашу корзину.</h1>
                    <div className={styles.loginContainer}>
                        <NavLink 
                            to="/login" 
                            className={styles.loginButton}
                        >
                            Войти
                        </NavLink>
                    </div>
                </>
            )}
        </div>
    );
}
