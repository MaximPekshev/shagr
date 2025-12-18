import styles from './header.module.css';
import { NavLink, useLocation, useSearchParams, useNavigate } from "react-router";
import { Badge, Input } from 'antd';
import { Menu, Layout } from 'antd';
import logo from '../../assets/img/logo/logo.png';
import { MenuOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { MobileMenu } from "../mobileMenu/MobileMenu";
import { useEffect, useState } from "react";
import { useGetCartQuery } from "../../redux/services/cart";
import { useGetWishlistQuery } from "../../redux/services/wishlist";

const { Header } = Layout;
const { Search } = Input;

export const HeaderComponent = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('shagr_token');
    const location = useLocation();
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const searchQuery = useSearchParams()[0].get('q') || '';
    const [searchValue, setSearchValue] = useState(searchQuery);
    const { data: cart } = useGetCartQuery({header: { token: token }});
    const { data: wishlist } = useGetWishlistQuery({header: { token: token }});

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const getCurrentKey = (path) => {
        if (path === '/') return '1';
        if (path === '/catalog') return '2';
        if (path === '/contacts') return '3';
        return '';
    };

    const Logout = () => {
        localStorage.removeItem('shagr_token');
        window.location.reload();
    };

    const currentKey = getCurrentKey(location.pathname);

    const onSearch = (value) => {
        setSearchValue(value);
        navigate(`/catalog/?page=1&q=${value}`);
    };

    const onInput = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        setSearchValue(searchQuery);
    }, [searchQuery]);

    return (
        <>
        <Header className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.userActions}>
                    { token ? (
                        <>
                            <NavLink to="/account" className={styles.loginButton}>Account</NavLink>
                            <button onClick={Logout} className={styles.loginButton}>Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className={styles.loginButton}>Login</NavLink>
                    )}
                    <Badge size="small" count={ cart ? cart.items.length : 0 }>
                        <NavLink to="/cart" className={styles.cart}>
                            <ShoppingCartOutlined className={styles.cartIcon} />
                        </NavLink>
                    </Badge>
                    <Badge size="small" count={ wishlist ? wishlist.items.length : 0 }>
                        <NavLink to="/wishlist" className={styles.wishlist}>
                            <HeartOutlined className={styles.wishIcon} />
                        </NavLink>
                    </Badge>
                </div>
                <div className={styles.hamburgerMenu}>
                    <button onClick={() => toggleMobileMenu()} className={styles.mobileMenuButton}>
                        <MenuOutlined />
                    </button>
                </div>
            </div>
            <div className={styles.headerMiddle} >
                <div className={styles.logo}>
                    <NavLink to="/">
                        <img src={logo} alt="Logo" />
                    </NavLink>
                </div>
                <div className={styles.searchBar}>
                    <Search onInput={onInput} value={searchValue} placeholder="Поиск..." onSearch={onSearch} enterButton />
                </div>
                <Menu
                    className={styles.menu}
                    mode="horizontal"
                    selectedKeys={[currentKey]}
                    items={[
                    { key: '1', label: (
                        <NavLink to="/">
                            Home
                        </NavLink>
                        ) },
                    { key: '2', label: (
                        <NavLink to="/catalog">
                            Catalog
                        </NavLink>
                        ) },
                    { key: '3', label: (
                        <NavLink to="/contacts">
                            Contacts
                        </NavLink>
                        ) },
                    ]}
                />
            </div>
            
            <MobileMenu 
                visible={mobileMenuVisible} 
                onClose={toggleMobileMenu} 
                token={token}
                Logout={Logout}
                cart={cart}
                wishlist={wishlist}
            />
        </Header>
        <div className={styles.mobileSearchBar}>
                <Search onInput={onInput} value={searchValue} placeholder="Поиск..." onSearch={onSearch} enterButton />
            </div>
        </>
    )
}