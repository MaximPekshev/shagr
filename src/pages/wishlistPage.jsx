import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { WishlistWrapper } from "../components/wishlistPage/WishlistWrapper"; 
export const WishlistPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Домой', to: "/" }, { title: 'Избранное' }]} />
            <div className="content-wrapper">
                <WishlistWrapper />
            </div>
        </>
    )
}