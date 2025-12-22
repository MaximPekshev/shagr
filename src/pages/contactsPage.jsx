import { Breadcrumbs } from '../components/breadcrumbs/Breadcrumbs'
import { NavLink } from 'react-router'
export const ContactsPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { title: <NavLink to="/">Домой</NavLink> }, 
                { title: 'Контакты' }]} 
            />
            <div className="content-wrapper">
                <h1>Добро пожаловать на страницу контактов</h1>
                <p>Это страница контактов приложения.</p>
            </div>
        </>
    )
}