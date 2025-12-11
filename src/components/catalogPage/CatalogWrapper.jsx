import { CatalogCard } from "./Card.jsx";
import styles from './catalogWrapper.module.css';
import { Col, Row } from 'antd';
import noImage from '../../assets/img/product/no_image.png';
import { CatalogPagination } from "./Pagination.jsx";
export const CatalogWrapper = () => {
    return (
        <div className={styles.catalogWrapper}>
            <Row justify="center" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                { Array.from({ length: 8 }).map((_, index) => (
                    <Col key={index} className="gutter-row">
                        <CatalogCard
                            title={`Product ${index + 1}`}
                            description="This is a great product."
                            imageUrl={noImage}
                        />
                    </Col>
                )) }
            </Row>
            <CatalogPagination />
        </div>
    )
}