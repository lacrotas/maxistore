import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiTruck, FiPhone, FiList } from 'react-icons/fi';
import './Header.scss';
import { MAIN_ROUTE, BUSKET_ROUTE, AMIN_MAIN_ROUTE } from "../../pages/appRouter/Const";
import ModalWindow from "../modalWindow/ModalWindow";
import CatalogInfoSlide from "../catalogInfoSlide/CatalogInfoSlide";

export default function Header({ isAdminHeader }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    // Функция для подсчета товаров в корзине
    const updateCartCount = () => {
        const basket = localStorage.getItem("maxiBasket") || "false";
        const items = basket === "false" ? [] : basket.split(',');
        setCartItemsCount(items.filter(id => id).length);
    };

    // Слушатель изменений в localStorage
    useEffect(() => {
        // Первоначальная загрузка количества
        updateCartCount();

        // Функция-обработчик изменений
        const handleStorageChange = () => {
            updateCartCount();
        };

        // Добавляем слушатель
        window.addEventListener('storage', handleStorageChange);

        // Удаляем слушатель при размонтировании
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Остальной код компонента остается без изменений
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // modal
    const [isModalActive, setIsModalActive] = useState(false);
    const [modalType, setModalType] = useState("");
    const [isCategotyActive, setIsCategoryActive] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    function openModal(type) {
        setIsModalActive(true);
        setModalType(type);
    }
    
    useEffect(() => {
        if (isModalActive || isCategotyActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    });

    function handleBurgerClose(myFunck, value) {
        setIsBurgerOpen(false);
        myFunck(value);
    }

    return (
        <>
            <header className="main-header">
                <div className="container">
                    <div className="header-content">
                        <button className="categories-btn" onClick={() => setIsCategoryActive(true)}>
                            <FiList className="icon" />
                            <span>Категории</span>
                        </button>

                        <NavLink to="/" className="logo">
                            <span>MAXI</span>STORE
                        </NavLink>

                        <nav className="main-nav">
                            <div className="action-buttons">
                                <button className="action-btn" onClick={() => openModal("search")}>
                                    <FiSearch className="icon" />
                                    <span>Поиск</span>
                                </button>
                                <button className="action-btn" onClick={() => openModal("delivery")}>
                                    <FiTruck className="icon" />
                                    <span className="tiny_p">Доставка</span>
                                </button>
                                <button className="action-btn" onClick={() => openModal("contacts")}>
                                    <FiPhone className="icon" />
                                    <span>Контакты</span>
                                </button>
                            </div>
                            <NavLink to={BUSKET_ROUTE} className="cart-btn">
                                <FiShoppingCart className="icon" />
                                {cartItemsCount > 0 && (
                                    <span className="cart-count">{cartItemsCount}</span>
                                )}
                            </NavLink>
                        </nav>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <button className="mobile-menu-link">
                        <FiList className="icon" />
                        Категории
                    </button>
                    <button className="mobile-menu-link">
                        <FiSearch className="icon" />
                        Поиск
                    </button>
                    <button className="mobile-menu-link">
                        <FiTruck className="icon" />
                        Доставка
                    </button>
                    <button className="mobile-menu-link">
                        <FiPhone className="icon" />
                        Контакты
                    </button>
                    <NavLink
                        to="/basket"
                        className="mobile-menu-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <FiShoppingCart className="icon" />
                        Корзина
                        {cartItemsCount > 0 && (
                            <span className="cart-count">{cartItemsCount}</span>
                        )}
                    </NavLink>
                </div>
            </div>
            
            {isModalActive && <ModalWindow setIsModalActive={setIsModalActive} type={modalType} />}
            {isCategotyActive && <CatalogInfoSlide setIsCategoryActive={setIsCategoryActive} />}
        </>
    );
}