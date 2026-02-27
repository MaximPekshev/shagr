import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { ProductWrapper } from "../components/productPage/ProductWrapper";
import { NavLink } from "react-router";
export const ProductPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { title: <NavLink to="/">Каталог</NavLink> },
            ]} />
            <div className="content-wrapper">
                <ProductWrapper />
            </div>
        </>
    );
}