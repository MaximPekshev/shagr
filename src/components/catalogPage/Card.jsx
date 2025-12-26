import { Card, Spin } from "antd";
import { ShoppingCartOutlined, HeartOutlined, HeartFilled, LoadingOutlined } from '@ant-design/icons';
const { Meta } = Card;
import styles from './card.module.css';
import { NavLink } from "react-router";
import { useAddCartItemMutation } from "../../redux/services/cart";
import { useAddWishlistItemMutation, useGetWishlistQuery, useDeleteWishlistItemMutation } from "../../redux/services/wishlist";


export const CatalogCard = ({ product, noImage }) => {
    const token = localStorage.getItem('shagr_token');
    const [addCartItem, { isLoading: isCartLoading, isFetching: isCartFetching }] = useAddCartItemMutation();
    const [addWishlistItem, { isLoading: isWishlistLoading, isFetching: isWishlistFetching }] = useAddWishlistItemMutation();
    const [deleteWishlistItem, { isLoading: isDeleteWishlistLoading, isFetching: isDeleteWishlistFetching }] = useDeleteWishlistItemMutation();
    const { data: wishlist } = useGetWishlistQuery({ header: { token: token } });
    const isInWishlist = wishlist?.items.some(wishlistItem => wishlistItem.good.slug === product.slug);
    

    const handleAddToCart = (e) => {
        e.preventDefault();
        addCartItem({ header: { token: token }, item: { good_slug: product.slug, quantity: 1 } });
    };

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        if (isInWishlist) {
            deleteWishlistItem({ header: { token: token }, item: { good_slug: product.slug, quantity: 1 } });
            return;
        }
        addWishlistItem({ header: { token: token }, item: { good_slug: product.slug, quantity: 1 } });
    };

    return (
        <NavLink to={`/catalog/${product.slug}`} className={styles.cardLink} >
            <Card
                hoverable
                style={{ width: 240 }}
                cover={
                    <>
                        <img
                            draggable={false}
                            alt={product.name}
                            src={ product.preview_image ? product.preview_image.path : noImage}
                        />
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
                    <h3 className={styles.title}>{product.name}</h3>
                    <div className={styles.bottom} >
                        <p className={styles.price}><span>Цена:</span>{product.price}</p>
                        { token && (
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
                        )}
                    </div>
                </div>
            </Card>
        </NavLink>
    )
}