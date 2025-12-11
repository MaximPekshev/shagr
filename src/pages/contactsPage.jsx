import { Breadcrumbs } from '../components/breadcrumbs/Breadcrumbs'
export const ContactsPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Home', to: "/" }, { title: 'Contacts' }]} />
            <div className="content-wrapper">
                <h1>Welcome to the Contacts Page</h1>
                <p>This is the contacts page of the application.</p>
            </div>
        </>
    )
}