import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { WishlistWrapper } from "../components/wishlistPage/WishlistWrapper"; 
import { NavLink } from "react-router";
export const WishlistPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { title: 'Избранное' }
            ]} />
            <div className="content-wrapper">
                <WishlistWrapper />
            </div>
        </>
    )
}