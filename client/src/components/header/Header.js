import BasketImage from "../../assets/images/basket.png";
import PhoneImage from "../../assets/images/phone.png";
import SearchImage from "../../assets/images/search.png";
import TruckImage from "../../assets/images/truck.png";
import ListImage from "../../assets/images/list.png";
import "./Header.scss";
import { useState, useEffect } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import CatalogInfoSlide from "../catalogInfoSlide/CatalogInfoSlide";
import { NavLink } from "react-router-dom";
import { MAIN_ROUTE, BUSKET_ROUTE, AMIN_MAIN_ROUTE } from "../../pages/appRouter/Const";


export default function Headers({ isAdminHeader }) {

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
        // Возвращаем функцию, которая будет выполняться при размонтировании компонента
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
            {isModalActive ? <ModalWindow setIsModalActive={setIsModalActive} type={modalType} /> : <></>}
            {!isAdminHeader ?
                <header className="header">
                    <div className="header_upper">
                        <p className="upper_text tiny_p" onClick={() => openModal("contacts")}>Контакты</p>
                        <p className="upper_text tiny_p" onClick={() => openModal("delivery")}>Доставка</p>
                        <p className="upper_text tiny_p" onClick={() => openModal("delivery")}>Оплата</p>
                    </div>
                </header> :
                <header className="header">
                    <div className="header_upper">
                        <NavLink to={AMIN_MAIN_ROUTE}>
                            <p className="upper_text tiny_p">Панель админа</p>
                        </NavLink>
                    </div>
                </header>
            }
            <header className="header_container">
                <div className="header_category" onClick={() => setIsCategoryActive(true)}>
                    <img className="category_image" src={ListImage} alt="list" />
                    <p className="category_text medium_p">Категории</p>
                </div>
                <NavLink to={MAIN_ROUTE}>
                    <p className="category_text large_p">MAXISTORE</p>
                </NavLink>
                <div className="header_buttons">
                    <img className="buttons_image" onClick={() => openModal("search")} src={SearchImage} alt="search_Image" />
                    <img className="buttons_image" onClick={() => openModal("delivery")} src={TruckImage} alt="truck_Image" />
                    <img className="buttons_image" onClick={() => openModal("contacts")} src={PhoneImage} alt="phone_Image" />
                    <NavLink to={BUSKET_ROUTE}>
                        <img className="buttons_image" src={BasketImage} alt="basket_Image" />
                    </NavLink>
                </div>
                <div className="header_buttons--headen">
                    <img className="buttons_image" onClick={() => openModal("search")} src={SearchImage} alt="search_Image" />
                    <img className="buttons_image" onClick={() => setIsBurgerOpen(!isBurgerOpen)} src={ListImage} alt="truck_Image" />
                </div>
            </header >
            <div className={`burger_menu ${isBurgerOpen ? "active" : "unactive"}`} style={isCategotyActive ? { display: "none" } : { display: "block"}}>
                <p onClick={() => handleBurgerClose(setIsCategoryActive, true)} className="medium_p">Категории</p>
                <p onClick={() => handleBurgerClose(openModal, "delivery")} className="medium_p">Доставка</p>
                <p onClick={() => handleBurgerClose(openModal, "delivery")} className="medium_p">Оплата</p>
                <p onClick={() => handleBurgerClose(openModal, "contacts")} className="medium_p">Контакты</p>
                <NavLink to={BUSKET_ROUTE}>
                    <p className="medium_p">Корзина</p>
                </NavLink>

            </div>
            {isCategotyActive ? <CatalogInfoSlide setIsCategoryActive={setIsCategoryActive} /> : <></>}
        </>
    )
}