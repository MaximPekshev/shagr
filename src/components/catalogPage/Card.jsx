import { Card, Spin, InputNumber } from "antd";
import { ShoppingCartOutlined, HeartOutlined, HeartFilled, LoadingOutlined } from '@ant-design/icons';
const { Meta } = Card;
import styles from './card.module.css';
import { NavLink } from "react-router";
import { useAddCartItemMutation } from "../../redux/services/cart";
import { useAddWishlistItemMutation, useGetWishlistQuery, useDeleteWishlistItemMutation } from "../../redux/services/wishlist";
import { useState } from "react";


export const CatalogCard = ({ product, noImage }) => {
    const token = localStorage.getItem('shagr_token');
    const [quantity, setQuantity] = useState(1);
    const [addCartItem, { isLoading: isCartLoading, isFetching: isCartFetching }] = useAddCartItemMutation();
    const [addWishlistItem, { isLoading: isWishlistLoading, isFetching: isWishlistFetching }] = useAddWishlistItemMutation();
    const [deleteWishlistItem, { isLoading: isDeleteWishlistLoading, isFetching: isDeleteWishlistFetching }] = useDeleteWishlistItemMutation();
    const { data: wishlist } = useGetWishlistQuery({ header: { token: token } });
    const isInWishlist = wishlist?.items.some(wishlistItem => wishlistItem.good.slug === product.slug);
    

    const handleAddToCart = (e) => {
        e.preventDefault();
        addCartItem({ header: { token: token }, item: { good_slug: product.slug, quantity: quantity } });
    };

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        if (isInWishlist) {
            deleteWishlistItem({ header: { token: token }, item: { good_slug: product.slug, quantity: 1 } });
            return;
        }
        addWishlistItem({ header: { token: token }, item: { good_slug: product.slug, quantity: 1 } });
    };

    const handleQtyChange = (value) => {
        setQuantity(value);
    };

    const qtyProps = {
        mode: 'spinner',
        min: 1,
        max: 100000,
        value: quantity,
        onChange: handleQtyChange,
        size: 'large',
        className: styles.qtyInput,
    };

    return (
        <>
            <Card
                hoverable
                style={{ width: 240 }}
                className={styles.card}
                cover={
                    <>
                        <NavLink to={`/${product.slug}`} className={styles.cardLink} >
                            <img
                                draggable={false}
                                alt={product.name}
                                src={ product.preview_image ? product.preview_image.path : noImage}
                            />
                        </NavLink>
                        <div className={styles.overlay}>
                            { token && (
                                <button 
                                    onClick={handleAddToWishlist} 
                                    className={styles.favorites}
                                >
                                    { isWishlistLoading || isWishlistFetching || isDeleteWishlistLoading || isDeleteWishlistFetching ? (
                                        <Spin indicator={<LoadingOutlined spin />} />
                                    ) : (
                                        <>
                                            { isInWishlist ? <HeartFilled /> : <HeartOutlined /> }
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                }
            >
                <div className={styles.cardInfo}>
                    <NavLink to={`/${product.slug}`} className={styles.cardLink} >
                        <h3 className={styles.title}>{product.name}</h3>
                    </NavLink>
                    <div className={styles.bottom} >
                        <div className={styles.priceWrapper}>
                            <span>Цена:</span>
                            <div className={styles.price}>{product.price_without_vat}</div>
                        </div>
                        { token && (
                            <div className={styles.actions}>
                                <InputNumber {...qtyProps} />
                                <button 
                                    onClick={handleAddToCart} 
                                    className={styles.addToCartButton}
                                >
                                    { isCartLoading || isCartFetching ? (
                                        <Spin className={styles.spin} indicator={<LoadingOutlined spin />} />
                                    ) : (   
                                        <ShoppingCartOutlined />
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </>
    )
}