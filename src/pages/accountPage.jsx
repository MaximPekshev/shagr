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
                    <h1>Welcome to your account!</h1>
                    {/* Additional account details and components can be added here */}
                </div>
            ) : (
                <div className="content-wrapper">
                    <h1>Please log in to access your account.</h1>
                </div>
            )}
        </>
    );
}