
import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs"
import { NavLink } from "react-router";
export const IndexPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: <NavLink to="/">Домой</NavLink> }]} />
            <div className="content-wrapper">
                <h1>Добро пожаловать</h1>
                <p>Это главная страница приложения.</p>
            </div>
        </>
    )
}