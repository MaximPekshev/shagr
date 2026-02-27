import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { OrderListWrapper } from "../components/accountPage/OrderListWrapper";
export const AccountPage = () => {
    const token = localStorage.getItem('shagr_token');
    return (
        <>
            <Breadcrumbs 
                items={[
                    { title: 'Личный кабинет' }
                ]}
            />
            { token ? (
                <div className="content-wrapper">
                    <OrderListWrapper />
                </div>
            ) : (
                <div className="content-wrapper">
                    <h1>Пожалуйста, войдите, чтобы получить доступ к вашему личному кабинету.</h1>
                </div>
            )}
        </>
    );
}