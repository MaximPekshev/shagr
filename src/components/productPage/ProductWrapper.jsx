import styles from './productWrapper.module.css';
import noImage from '../../assets/img/product/no_image.png';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled, LoadingOutlined } from '@ant-design/icons';
import { InputNumber, Image, Spin } from 'antd';
import { useGetProductQuery } from '../../redux/services/api';
import { useParams } from 'react-router';
import { useAddCartItemMutation } from "../../redux/services/cart";
import { useAddWishlistItemMutation, useGetWishlistQuery, useDeleteWishlistItemMutation } from "../../redux/services/wishlist";
import { useState } from 'react';
export const ProductWrapper = () => {
    const { productSlug } = useParams();
    const { data: product, error, isLoading, isFetching } = useGetProductQuery( productSlug );
    const token = localStorage.getItem('shagr_token');
    const [addCartItem, { isLoading: isCartLoading, isFetching: isCartFetching }] = useAddCartItemMutation();
    const [addWishlistItem, { isLoading: isWishlistLoading, isFetching: isWishlistFetching }] = useAddWishlistItemMutation();
    const [deleteWishlistItem, { isLoading: isDeleteWishlistLoading, isFetching: isDeleteWishlistFetching }] = useDeleteWishlistItemMutation();
    const { data: wishlist } = useGetWishlistQuery({ header: { token: token } });

    const isInWishlist = wishlist?.items.some(wishlistItem => wishlistItem.good.slug === product?.slug);
    
    const [quantity, setQuantity] = useState(1);

    const qtyOnChange = value => {
        setQuantity(value);
    };

    if (isLoading || isFetching) {
        return <p>Loading...</p>;
    }

    if (error || !product) {
        return <p>Product not found.</p>;
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        addCartItem({ header: { token: token }, item: { good_slug: product.slug, quantity: quantity } });
    };

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        if (isInWishlist) {
            deleteWishlistItem({ header: { token: token }, item: { good_slug: product.slug, quantity: quantity } });
            return;
        }
        addWishlistItem({ header: { token: token }, item: { good_slug: product.slug, quantity: quantity } });
    };

    return (
        <div className={styles.productWrapper}>
            <div className={`${styles.productImage} product-card-image`}>
                <Image
                    alt={product.name}
                    src={product.preview_image ? product.preview_image.path : noImage}
                    placeholder={
                        <Image
                            preview={false}
                            alt={product.name}
                            src={product.preview_image ? product.preview_image.path : noImage}
                        />
                    }
                />
            </div>
            <div className={styles.productDetails}>
                <h1 className={styles.productTitle}>{product.name}</h1>
                <p className={styles.productDescription}>
                    {product.description || 'Описание отсутствует.'}
                </p>
                <p className={styles.productPrice}><span>Цена:</span>{product.price}</p>
                { token && (
                    <div className={styles.productActions}>
                        <InputNumber size="large" min={1} max={100000} value={quantity} onChange={qtyOnChange} />
                        { isCartLoading || isCartFetching ? (
                            <> 
                                <button 
                                    className={styles.addToCartButton}
                                >
                                    <Spin className={styles.spin} indicator={<LoadingOutlined spin />} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    className={styles.addToCartButton}
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCartOutlined className={styles.cartIcon} />
                                    <span>В корзину</span>
                                </button>
                            </>
                            
                        )}
                        { isWishlistLoading || isWishlistFetching || isDeleteWishlistLoading || isDeleteWishlistFetching ? (
                            <>
                                <button 
                                    className={styles.addToWishlistButton}
                                >
                                    <Spin indicator={<LoadingOutlined spin />} />
                                </button>
                            </>
                        ) : (
                            <>  
                                <button 
                                    className={styles.addToWishlistButton}
                                    onClick={handleAddToWishlist}
                                >   
                                    { isInWishlist ? <HeartFilled /> : <HeartOutlined /> }
                                </button>
                            </>
                        )}
                        
                    </div>
                )}
            </div>
        </div>
    );
}