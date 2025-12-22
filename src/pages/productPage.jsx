import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { ProductWrapper } from "../components/productPage/ProductWrapper";
import { NavLink } from "react-router";
export const ProductPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { title: <NavLink to="/">Домой</NavLink> },  
                { title: <NavLink to="/catalog">Каталог</NavLink> },
                // { title: 'Product' }
            ]} />
            <div className="content-wrapper">
                <ProductWrapper />
            </div>
        </>
    );
}