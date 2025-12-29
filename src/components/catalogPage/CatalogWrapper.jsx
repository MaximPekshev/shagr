import { CatalogCard } from "./Card.jsx";
import styles from './catalogWrapper.module.css';
import { Col, Row } from 'antd';
import noImage from '../../assets/img/product/no_image.png';
import { CatalogPagination } from "./Pagination.jsx";
import { Grid } from 'antd';
import { useGetProductsQuery } from "../../redux/services/api.js";
import { useSearchParams } from "react-router";
import { Sidebar } from "./Sidebar.jsx";
import { MobileCategoriesList } from "./MobileCategoriesList.jsx";

export const CatalogWrapper = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const searchQuery = searchParams.get('q') || '';
    const categoryQuery = searchParams.get('category') || '';
    const qtyOnPage = 24;
    const gutterSettings = { xs: 8, sm: 16, md: 24, lg: 32 };
    const screens = Grid.useBreakpoint();
    const responsiveColSpan = screens.xxl
        ? 6   // 4 cards per row
        : screens.xl
        ? 8   // 3 cards per row
        : screens.lg
        ? 8   // 3 cards per row
        : screens.md
        ? 12  // 2 cards per row
        : 24; // 1 card per row

    const { 
        data: products, 
        // error, 
        isLoading, 
        isFetching 
    } = useGetProductsQuery({
        page: Number(page), 
        category: categoryQuery, 
        compilation: null, 
        search: searchQuery 
    });

    if ( isLoading || isFetching ) {
        return (
            <>
                <MobileCategoriesList />
                <div className={styles.catalogWrapper}>
                    <Sidebar />
                    <div className={styles.catalogBody}>
                        <p>Загрузка товаров...</p>
                    </div>
                </div>
            </>
        )
    }
    
    if (!products || products.goods.length === 0) {
        return (
            <>
                <MobileCategoriesList />
                <div className={styles.catalogWrapper}>
                    <Sidebar />
                    <div className={styles.catalogBody}>
                        <p>Товары не найдены.</p>
                    </div>
                </div>
            </>
        )
    };
    
    const onPageChange = (page) => {
        location.href = `/catalog/?page=${page}`;
    };

    return (
        <>
            <MobileCategoriesList />
            <div className={styles.catalogWrapper}>
                <Sidebar categorySlug={categoryQuery} />
                <div className={styles.catalogBody}>
                    <Row className={styles.catalogRow}  justify="center" gutter={[gutterSettings, gutterSettings]}>
                        {products && products.goods.map((product) => (
                            <Col key={product.id} className={`gutter-row ${styles.catalogCol}`} span={responsiveColSpan}>
                                <CatalogCard
                                    product={product}
                                    noImage={noImage}
                                />
                            </Col>
                        )) }
                    </Row>
                    <CatalogPagination
                        totalItems={products ? products.count : 0}
                        itemsPerPage={qtyOnPage}
                        onPageChange={onPageChange}
                        currentPage={Number(page)}
                    />
                </div>
            </div>
        </>
    )
}