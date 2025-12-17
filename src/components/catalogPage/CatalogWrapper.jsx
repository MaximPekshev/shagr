import { CatalogCard } from "./Card.jsx";
import styles from './catalogWrapper.module.css';
import { Col, Row } from 'antd';
import noImage from '../../assets/img/product/no_image.png';
import { CatalogPagination } from "./Pagination.jsx";
import { Grid } from 'antd';
import { useGetProductsQuery } from "../../redux/services/api.js";
import { useSearchParams } from "react-router";

export const CatalogWrapper = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const qtyOnPage = 24;
    const gutterSettings = { xs: 8, sm: 16, md: 24, lg: 32 };
    const screens = Grid.useBreakpoint();
    const responsiveColSpan = screens.xl
        ? 6   // 4 cards per row
        : screens.lg
        ? 8   // 3 cards per row
        : screens.md
        ? 12  // 2 cards per row
        : 24; // 1 card per row

    const { 
        data: products, 
        // error, 
        // isLoading, 
        // isFetching 
    } = useGetProductsQuery({
        page: Number(page), 
        category: null, 
        compilation: null, 
        search: '' 
    });

    // if ( isLoading || isFetching ) {
    //     return (
    //         <div className={styles.catalogWrapper}>
    //             <Row className={styles.catalogRow} justify="center" gutter={[gutterSettings, gutterSettings]}>
    //                 { Array.from({ length: qtyOnPage }).map((_, index) => (
    //                     <Col key={index} className={`gutter-row ${styles.catalogCol}`} span={responsiveColSpan}>
    //                         <CatalogCard.Skeleton />
    //                     </Col>
    //                 )) }
    //             </Row>
    //         </div>
    //     )
    // }
    
    const onPageChange = (page) => {
        location.href = `/catalog/?page=${page}`;
    }

    return (
        <div className={styles.catalogWrapper}>
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
    )
}