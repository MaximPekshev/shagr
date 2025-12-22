import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { CartWrapper } from "../components/cartPage/CartWrapper";
import { NavLink } from "react-router";
export const CartPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { title: <NavLink to="/">Домой</NavLink> }, 
                { title: 'Корзина' }]} 
            />
            <div className="content-wrapper">
                <CartWrapper />
            </div>
        </>
    )
}