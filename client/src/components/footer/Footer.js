import "./Footer.scss";
import LogoImage from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import ModalWindow from "../modalWindow/ModalWindow";

function Footer() {
    const [isModalActive, setIsModalActive] = useState(false);
    const [modalType, setModalType] = useState("");

    function openModal(type) {
        setIsModalActive(true);
        setModalType(type);
    }

    useEffect(() => {
        if (isModalActive) {
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

            <footer className="footer">
                <div className="footer_container">
                    <div className="container_links">
                        <p className="links_item small_p" onClick={() => openModal("contacts")}>Контакты</p>
                        <p className="links_item small_p" onClick={() => openModal("delivery")}>Доставка</p>
                        <p className="links_item small_p" onClick={() => openModal("delivery")}>Оплата</p>
                    </div>
                    <img src={LogoImage} alt="logo" className="container_image" />
                    <div className="container_contact">
                        <p className="contact_label medium_p">Связаться с нами</p>
                        <p className="contact_item small_p">+375 33 677-92-60</p>
                        <p className="contact_item small_p">+375 29 120-11-90</p>
                    </div>
                </div>
                <p className="footer_copyright small_p">copyright © Maxistore 2024</p>
            </footer>
        </>
    );
}

export default Footer;
