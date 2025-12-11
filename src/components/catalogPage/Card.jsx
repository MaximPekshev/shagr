import { Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
const { Meta } = Card;
import styles from './card.module.css';
export const CatalogCard = ({ title, description, imageUrl }) => {
    return (
        <>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={
                    <>
                        <img
                            draggable={false}
                            alt={title}
                            src={imageUrl}
                        />
                        <div className={styles.overlay}>
                            <button 
                                onClick={(e) => { e.preventDefault() }} 
                                className={styles.favorites}
                            >
                                <HeartOutlined />
                                {/* <HeartFilled /> */}
                            </button>
                        </div>
                    </>
                }
            >
                <div className={styles.cardInfo}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.bottom} >
                        <p className={styles.price}><span>Price:</span>$99.99</p>
                        <button onClick={(e) => { e.preventDefault() }} className={styles.addToCartButton}><ShoppingCartOutlined /></button>
                    </div>
                </div>
            </Card>
        </>
    )
}