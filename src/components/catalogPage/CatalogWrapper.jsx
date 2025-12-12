import { CatalogCard } from "./Card.jsx";
import styles from './catalogWrapper.module.css';
import { Col, Row } from 'antd';
import noImage from '../../assets/img/product/no_image.png';
import { CatalogPagination } from "./Pagination.jsx";
import { Grid } from 'antd';

export const CatalogWrapper = () => {
    const gutterSettings = { xs: 8, sm: 16, md: 24, lg: 32 };

    const screens = Grid.useBreakpoint();

    const responsiveColSpan = screens.xl
        ? 6   // 4 cards per row
        : screens.lg
        ? 8   // 3 cards per row
        : screens.md
        ? 12  // 2 cards per row
        : 24; // 1 card per row
    
    return (
        <div className={styles.catalogWrapper}>
            <Row className={styles.catalogRow}  justify="center" gutter={[gutterSettings, gutterSettings]}>
                { Array.from({ length: 8 }).map((_, index) => (
                    <Col key={index} className={`gutter-row ${styles.catalogCol}`} span={responsiveColSpan}>
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