import { LoginWrapper } from "../components/loginPage/LoginWrapper";
import { Breadcrumbs } from "../components/breadcrumbs/Breadcrumbs";
export const LoginPage = () => {
    return (
        <>
            <Breadcrumbs 
                items={[
                    { title: 'Home', to: "/" }, 
                    { title: 'Login' }
                ]}
            />
            <LoginWrapper />
        </>
    );
}