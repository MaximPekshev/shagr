
import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs"
export const IndexPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Домой' }]} />
            <div className="content-wrapper">
                <h1>Добро пожаловать</h1>
                <p>Это главная страница приложения.</p>
            </div>
        </>
    )
}