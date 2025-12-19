import { Breadcrumbs } from '../components/breadcrumbs/Breadcrumbs'
export const ContactsPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Домой', to: "/" }, { title: 'Контакты' }]} />
            <div className="content-wrapper">
                <h1>Добро пожаловать на страницу контактов</h1>
                <p>Это страница контактов приложения.</p>
            </div>
        </>
    )
}