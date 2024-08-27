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
import { MAIN_ROUTE, BUSKET_ROUTE } from "../../pages/appRouter/Const";

export default function Headers() {

    const [isModalActive, setIsModalActive] = useState(false);
    const [modalType, setModalType] = useState("");
    const [isCategotyActive, setIsCategoryActive] = useState(false);

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

    return (
        <>
            {isModalActive ? <ModalWindow setIsModalActive={setIsModalActive} type={modalType} /> : <></>}
            <header className="header">
                <div className="header_upper">
                    <p className="upper_text tiny_p" onClick={() => openModal("contacts")}>Контакты</p>
                    <p className="upper_text tiny_p" onClick={() => openModal("delivery")}>Доставка</p>
                    <p className="upper_text tiny_p" onClick={() => openModal("delivery")}>Оплата</p>
                </div>
            </header>
            <header className="header_container">
                <div className="header_category" onClick={() => setIsCategoryActive(true)}>
                    <img src={ListImage} alt="list" />
                    <p className="category_text medium_p jura_bold">Категории</p>
                </div>
                <NavLink to={MAIN_ROUTE}>
                    <p className="category_text large_p jura_bold">MAXISTORE</p>
                </NavLink>
                <div className="header_buttons">
                    <img className="buttons_image" onClick={() => openModal("search")} src={SearchImage} alt="search_Image" />
                    <img className="buttons_image" onClick={() => openModal("delivery")} src={TruckImage} alt="truck_Image" />
                    <img className="buttons_image" onClick={() => openModal("contacts")} src={PhoneImage} alt="phone_Image" />
                    <NavLink to={BUSKET_ROUTE}>
                        <img className="buttons_image" src={BasketImage} alt="basket_Image" />
                    </NavLink>
                </div>
            </header >
            {isCategotyActive ? <CatalogInfoSlide setIsCategoryActive={setIsCategoryActive} /> : <></>}
        </>
    )
}