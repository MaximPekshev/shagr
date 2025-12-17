import { Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
const { Meta } = Card;
import styles from './card.module.css';
import { NavLink } from "react-router";

export const CatalogCard = ({ product, noImage }) => {
    const token = localStorage.getItem('shagr_token');
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
                            src={noImage}
                        />
                        <div className={styles.overlay}>
                            { token && (
                                <button 
                                    onClick={(e) => { e.preventDefault() }} 
                                    className={styles.favorites}
                                >
                                    <HeartOutlined />
                                    {/* <HeartFilled /> */}
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
                                onClick={(e) => { e.preventDefault() }} 
                                className={styles.addToCartButton}
                            >
                                <ShoppingCartOutlined />
                            </button>
                        )}
                    </div>
                </div>
            </Card>
        </NavLink>
    )
}