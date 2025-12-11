
import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs"
export const IndexPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Home' }]} />
            <div className="content-wrapper">
                <h1>Welcome to the Index Page</h1>
                <p>This is the main landing page of the application.</p>
            </div>
        </>
    )
}