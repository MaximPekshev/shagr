import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { NavLink } from "react-router";
import { OrderListWrapper } from "../components/accountPage/OrderListWrapper";
export const AccountPage = () => {
    const token = localStorage.getItem('shagr_token');
    return (
        <>
            <Breadcrumbs 
                items={[
                    { title: <NavLink to="/">Домой</NavLink> }, 
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