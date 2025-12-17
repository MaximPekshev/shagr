import { NavLink } from 'react-router';
import styles from './wishlistWrapper.module.css';
import { Space, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useGetWishlistQuery, useDeleteWishlistItemMutation } from '../../redux/services/wishlist';

export const WishlistWrapper = () => {
    const token = localStorage.getItem('shagr_token');
    const { data: wishlist, error, isLoading, isFetching } = useGetWishlistQuery({ header: { token: token } });
    const [deleteWishlistItem] = useDeleteWishlistItemMutation();

    const delWishlistItem = (item) => {
        deleteWishlistItem({ header: { token: token }, item: { good_slug: item.key, quantity: 1 } });
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
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button 
                        className={styles.deleteButton} 
                        onClick={() => delWishlistItem(record)}
                    >
                        <CloseOutlined />
                    </button>
                </Space>
            ),
        },
    ];

    const data = wishlist?.items.map(item => (
        {
            key: item.good.slug,
            title: item.good.name,
            price: item.price,
        }
    ));

    return (
        <div className={styles.cartWrapper}>
            { token ? (
                <div className={styles.wishlistContainer}>
                    <h1>Избранное</h1>
                        { isLoading || isFetching ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Ошибка загрузки избранного.</p>
                        ) : !wishlist || wishlist.items.length === 0 ? (
                            <>
                                <p>Ваше избранное пусто.</p>
                                <NavLink 
                                    to="/catalog" 
                                    className={styles.loginButton}
                                >
                                    Каталог
                                </NavLink>
                            </>
                    ) : (
                        <Table columns={columns} dataSource={data} />
                    )}
                </div>                                     
            ) : (
                <>
                    <h1>Пожалуйста авторизуйтесь, чтобы просмотреть ваше избранное.</h1>
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
