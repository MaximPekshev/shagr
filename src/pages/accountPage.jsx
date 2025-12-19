import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
export const AccountPage = () => {
    const token = localStorage.getItem('shagr_token');
    return (
        <>
            <Breadcrumbs 
                items={[
                    { title: 'Home', to: "/" }, 
                    { title: 'Account' }
                ]}
            />
            { token ? (
                <div className="content-wrapper">
                    <h1>Добро пожаловать в ваш личный кабинет!</h1>
                </div>
            ) : (
                <div className="content-wrapper">
                    <h1>Пожалуйста, войдите, чтобы получить доступ к вашему личному кабинету.</h1>
                </div>
            )}
        </>
    );
}