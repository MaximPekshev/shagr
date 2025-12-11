import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { CatalogWrapper } from "../components/catalogPage/CatalogWrapper";

export const CatalogPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Home', to: "/" }, { title: 'Catalog' }]} />
            <div className="content-wrapper">
                <h1>Welcome to the Catalog Page</h1>
                <CatalogWrapper />

                
            </div>
        </>
    )
}