import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
export const CatalogPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Home', to: "/" }, { title: 'Catalog' }]} />
            <div className="content-wrapper">
                <h1>Welcome to the Catalog Page</h1>
                <p>This is the catalog page of the application.</p>
            </div>
        </>
    )
}