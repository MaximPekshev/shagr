import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { CartWrapper } from "../components/cartPage/CartWrapper";
export const CartPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { title: 'Корзина' }]} 
            />
            <div className="content-wrapper">
                <CartWrapper />
            </div>
        </>
    )
}