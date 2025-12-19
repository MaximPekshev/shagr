import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { CatalogWrapper } from "../components/catalogPage/CatalogWrapper";
import { useSearchParams } from "react-router";
import { useGetCategoryQuery } from "../redux/services/api";
import { useState, useEffect } from "react";

export const CatalogPage = () => {
    const [searchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category') || '';
    const [ categorySlug, setCategorySlug ] = useState(categoryQuery);
    const { data: categoryData } = useGetCategoryQuery(categorySlug);

    useEffect(() => {
        setCategorySlug(categoryQuery);
    }, [categoryQuery]);

    return (
        <>  
            { categoryQuery ? (
                <Breadcrumbs items={[
                    { title: 'Home', to: "/" }, 
                    { title: 'Catalog', to: "/catalog" },
                    { title: categoryData?.name, to: `/catalog/?category=${categoryQuery}` }
                ]} />
            ) : (
                <Breadcrumbs items={[
                    { title: 'Home', to: "/" }, 
                    { title: 'Catalog' }]} 
                />
            )}
            <div className="content-wrapper">
                <CatalogWrapper />
            </div>
        </>
    )
}