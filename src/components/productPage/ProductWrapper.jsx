import styles from './productWrapper.module.css';
import noImage from '../../assets/img/product/no_image.png';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { InputNumber, Image } from 'antd';
export const ProductWrapper = () => {

    const qtyOnChange = value => {
        console.log('changed', value);
    };

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
                <h1 className={styles.productTitle}>Product Title</h1>
                <p className={styles.productDescription}>
                    This is a detailed description of the product. It highlights the features, specifications, and benefits of the product to help customers make informed purchasing decisions.
                </p>
                <p className={styles.productPrice}><span>Price:</span>$199.99</p>
                <div className={styles.productActions}>
                    <InputNumber size="large" min={1} max={100000} defaultValue={1} onChange={qtyOnChange} />
                    <button className={styles.addToCartButton}>
                        <ShoppingCartOutlined className={styles.cartIcon} />
                        <span>Add to cart</span>
                    </button>
                    <button className={styles.addToWishlistButton}>
                        <HeartOutlined />
                    </button>
                </div>
            </div>
        </div>
    );
}