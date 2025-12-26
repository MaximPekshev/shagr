import { NavLink } from 'react-router';
import { useState} from 'react';
import { useCreateOrderMutation } from '../../redux/services/order';
import styles from './cartWrapper.module.css';
import { Space, Table, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useGetCartQuery, useDeleteCartItemMutation, useClearCartMutation } from '../../redux/services/cart';
import { ModalComponent } from '../modal/Modal';

export const CartWrapper = () => {
    const token = localStorage.getItem('shagr_token');
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isAnswerModalOpen, setIsAnswerModalOpen ] = useState(false);
    const { data: cart, error, isLoading, isFetching } = useGetCartQuery({ header: { token: token } });
    const [createOrder] = useCreateOrderMutation();
    const [deleteCartItem] = useDeleteCartItemMutation();
    const [clearCart] = useClearCartMutation();
    
    const delCartItem = (item) => {
        deleteCartItem({ header: { token: token }, item: { good_slug: item.key, quantity: item.quantity } });
    };

    const cartAmount = cart?.items.reduce((total, item) => total + item.amount, 0).toFixed(2);

    const columns = [
        {
            title: 'Товар',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <NavLink 
                    disabled={cart.items.length === 0}
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
            price: item.price.toFixed(2),
            quantity: item.quantity,
            total: item.amount.toFixed(2),
        }
    ));

    const handleCreateOrder = () => {
        setIsModalOpen(false);
        createOrder(
            { 
                header: { token: token }, 
                items: cart.items.map(item => (
                    { 
                        good_slug: item.good.slug, 
                        quantity: item.quantity,
                        price: item.good.price,
                        amount: item.amount
                    }
                ))
            }
        ).then(() => {
            clearCart({ header: { token: token } }).then(() => {
                setIsAnswerModalOpen(true);
            });
        }).catch((error) => {
            console.error('Ошибка при создании заказа:', error);
        });
    };

    return (
        <>
            <div className={styles.cartWrapper}>
                { token ? (
                    <div className={styles.cartContainer}>                
                        <h1>Корзина</h1>
                        { isLoading || isFetching ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Ошибка загрузки корзины.</p>
                        ) : !cart || cart.items.length === 0 ? (
                            <>
                                <p>Ваша корзина пуста.</p>
                                <NavLink 
                                    to="/catalog" 
                                    className={styles.loginButton}
                                >
                                    Каталог
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <Table columns={columns} dataSource={data} />
                                <div className={styles.cartTotal}>
                                    <div className={styles.cartTotalLabel}>Итого: </div>
                                    <div className={styles.cartTotalValue}>{cartAmount} ₽</div>
                                </div>
                                <div className={styles.checkoutContainer}>
                                    <Button 
                                        disabled={cart.items.length === 0}
                                        to="/checkout" 
                                        onClick={() => setIsModalOpen(true)}
                                        className={styles.checkoutButton}
                                    >
                                        Оформить заказ
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
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
            <ModalComponent 
                isOpen={isModalOpen}
                title="Вы увенерены, что хотите отправить заказ?"
                onClose={() => setIsModalOpen(false)}
                handleOk={handleCreateOrder}
            />
            {/* <ModalComponent 
                isOpen={isCreatingOrder}
                title="Создание заказа..."
            /> */}
            <ModalComponent
                isOpen={isAnswerModalOpen}
                handleOk={() => setIsAnswerModalOpen(false)}
                title="Заказ успешно создан!"
                onClose={() => setIsAnswerModalOpen(false)}
            />
        </>
    );
}
