import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { ProductWrapper } from "../components/productPage/ProductWrapper";
export const ProductPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { title: 'Home', to: "/" }, 
                { title: 'Catalog', to: "/catalog" },
                { title: 'Product' }
            ]} />
            <div className="content-wrapper">
                <ProductWrapper />
            </div>
        </>
    );
}