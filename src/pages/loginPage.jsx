import { LoginWrapper } from "../components/loginPage/LoginWrapper";
import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
import { NavLink } from "react-router";
export const LoginPage = () => {
    return (
        <>
            <Breadcrumbs 
                items={[
                    { title: <NavLink to="/">Домой</NavLink> },  
                    { title: 'Вход' }
                ]}
            />
            <LoginWrapper />
        </>
    );
}