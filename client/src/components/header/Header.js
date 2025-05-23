// import BasketImage from "../../assets/images/basket.png";
// import PhoneImage from "../../assets/images/phone.png";
// import SearchImage from "../../assets/images/search.png";
// import TruckImage from "../../assets/images/truck.png";
// import ListImage from "../../assets/images/list.png";
// import "./Header.scss";
// import { useState, useEffect } from "react";
// import ModalWindow from "../modalWindow/ModalWindow";
// import CatalogInfoSlide from "../catalogInfoSlide/CatalogInfoSlide";
// import { NavLink } from "react-router-dom";
// import { MAIN_ROUTE, BUSKET_ROUTE, AMIN_MAIN_ROUTE } from "../../pages/appRouter/Const";


// export default function Headers({ isAdminHeader }) {

//     const [isModalActive, setIsModalActive] = useState(false);
//     const [modalType, setModalType] = useState("");
//     const [isCategotyActive, setIsCategoryActive] = useState(false);
//     const [isBurgerOpen, setIsBurgerOpen] = useState(false);

//     function openModal(type) {
//         setIsModalActive(true);
//         setModalType(type);
//     }
//     useEffect(() => {
//         if (isModalActive || isCategotyActive) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = '';
//         }
//         // Возвращаем функцию, которая будет выполняться при размонтировании компонента
//         return () => {
//             document.body.style.overflow = '';
//         };
//     }
//     )
//     function handleBurgerClose(myFunck, value) {
//         setIsBurgerOpen(false);
//         myFunck(value);
//     }
//     return (
//         <>
//             {isModalActive ? <ModalWindow setIsModalActive={setIsModalActive} type={modalType} /> : <></>}
//             {!isAdminHeader ?
//                 <header className="header">
//                     <div className="header_upper">
//                         <p className="upper_text common_reg tiny_p" onClick={() => openModal("contacts")}>Контакты</p>
//                         <p className="upper_text common_reg tiny_p" onClick={() => openModal("delivery")}>Доставка</p>
//                         <p className="upper_text common_reg tiny_p" onClick={() => openModal("delivery")}>Оплата</p>
//                     </div>
//                 </header> :
//                 <header className="header">
//                     <div className="header_upper">
//                         <NavLink to={AMIN_MAIN_ROUTE}>
//                             <p className="upper_text common_reg tiny_p">Панель админа</p>
//                         </NavLink>
//                     </div>
//                 </header>
//             }
//             <header className="header_container">
//                 <div className="header_category" onClick={() => setIsCategoryActive(true)}>
//                     <img className="category_image" src={ListImage} alt="list" />
//                     <p className="category_text medium_p common_reg">Категории</p>
//                 </div>
//                 <NavLink to={MAIN_ROUTE}>
//                     <p className="category_text large_p common_bold">MAXISTORE</p>
//                 </NavLink>
//                 <div className="header_buttons">
//                     <img className="buttons_image" onClick={() => openModal("search")} src={SearchImage} alt="search_Image" />
//                     <img className="buttons_image" onClick={() => openModal("delivery")} src={TruckImage} alt="truck_Image" />
//                     <img className="buttons_image" onClick={() => openModal("contacts")} src={PhoneImage} alt="phone_Image" />
//                     <NavLink to={BUSKET_ROUTE}>
//                         <img className="buttons_image" src={BasketImage} alt="basket_Image" />
//                     </NavLink>
//                 </div>
//                 <div className="header_buttons--headen">
//                     <img className="buttons_image" onClick={() => openModal("search")} src={SearchImage} alt="search_Image" />
//                     <img className="buttons_image" onClick={() => setIsBurgerOpen(!isBurgerOpen)} src={ListImage} alt="truck_Image" />
//                 </div>
//             </header >
//             <div className={`burger_menu ${isBurgerOpen ? "active" : "unactive"}`} style={isCategotyActive ? { display: "none" } : { display: "block"}}>
//                 <p onClick={() => handleBurgerClose(setIsCategoryActive, true)} className="medium_p">Категории</p>
//                 <p onClick={() => handleBurgerClose(openModal, "delivery")} className="medium_p">Доставка</p>
//                 <p onClick={() => handleBurgerClose(openModal, "delivery")} className="medium_p">Оплата</p>
//                 <p onClick={() => handleBurgerClose(openModal, "contacts")} className="medium_p">Контакты</p>
//                 <NavLink to={BUSKET_ROUTE}>
//                     <p className="medium_p">Корзина</p>
//                 </NavLink>

//             </div>
//             {isCategotyActive ? <CatalogInfoSlide setIsCategoryActive={setIsCategoryActive} /> : <></>}
//         </>
//     )
// }

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
    }
    )
    function handleBurgerClose(myFunck, value) {
        setIsBurgerOpen(false);
        myFunck(value);
    }
    return (
        <>
            <header className="main-header">
                <div className="container">
                    <div className="header-content">
                        <button className="categories-btn">
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
                                <span className="cart-count">3</span>
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

            {/* mobile menu */}
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
                        <span className="cart-count">3</span>
                    </NavLink>
                </div>
            </div>
            {/* modal windows */}
            {isModalActive ? <ModalWindow setIsModalActive={setIsModalActive} type={modalType} /> : <></>}
            {isCategotyActive ? <CatalogInfoSlide setIsCategoryActive={setIsCategoryActive} /> : <></>}
        </>
    );
}