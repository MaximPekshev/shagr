import styles from './productWrapper.module.css';
import noImage from '../../assets/img/product/no_image.png';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { InputNumber, Image } from 'antd';
import { useGetProductQuery } from '../../redux/services/api';
import { useParams } from 'react-router';
export const ProductWrapper = () => {
    const { productSlug } = useParams();
    const token = localStorage.getItem('shagr_token');
    const { data: product, error, isLoading, isFetching } = useGetProductQuery( productSlug );

    const qtyOnChange = value => {
        console.log('changed', value);
    };

    if (isLoading || isFetching) {
        return <p>Loading...</p>;
    }

    if (error || !product) {
        return <p>Product not found.</p>;
    }

    return (
        <div className={styles.productWrapper}>
            <div className={styles.productImage}>
                <Image
                    alt="basic image"
                    src={noImage}
                    placeholder={
                    <Image
                        preview={false}
                        alt="placeholder image"
                        src={noImage}
                    />
                    }
                />
            </div>
            <div className={styles.productDetails}>
                <h1 className={styles.productTitle}>{product.name}</h1>
                <p className={styles.productDescription}>
                    {product.description || 'No description available.'}
                </p>
                <p className={styles.productPrice}><span>Цена:</span>{product.price}</p>
                { token && (
                    <div className={styles.productActions}>
                        <InputNumber size="large" min={1} max={100000} defaultValue={1} onChange={qtyOnChange} />
                        <button className={styles.addToCartButton}>
                            <ShoppingCartOutlined className={styles.cartIcon} />
                            <span>В корзину</span>
                        </button>
                        <button className={styles.addToWishlistButton}>
                            <HeartOutlined />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}