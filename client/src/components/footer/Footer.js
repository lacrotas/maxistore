import "./Footer.scss";
import LogoImage from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import IntstaImg from "../../assets/images/socialLinks/skill-icons_instagram.png"
import TelegaImg from "../../assets/images/socialLinks/logos_telegram.png"
import VkImg from "../../assets/images/socialLinks/entypo-social_vk-with-circle.png"

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

            {/* <footer className="footer">
                <div className="footer_container">
                    <div className="container_links">
                        <p className="links_item small_p common_reg" onClick={() => openModal("contacts")}>Контакты</p>
                        <p className="links_item small_p common_reg" onClick={() => openModal("delivery")}>Доставка</p>
                        <p className="links_item small_p common_reg" onClick={() => openModal("delivery")}>Оплата</p>
                    </div>
                    <img src={LogoImage} alt="logo" className="container_image" />
                    <div className="container_contact">
                        <p className="contact_label medium_p common_reg">Связаться с нами</p>
                        <div className="container_contact_phones">
                        <p className="contact_item small_p common_reg">+375 33 677-92-60</p>
                        <p className="contact_item small_p common_reg">+375 29 120-11-90</p>
                        </div>
                    </div>
                </div>
                <p className="footer_copyright small_p">copyright © Maxistore 2024</p>
            </footer> */}
            <footer className="footer">
                <div className="footer_waves">
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                </div>


                <div className="footer_container">
                    <div className="footer_column footer_logo">
                        <img src={LogoImage} alt="logo" className="logo_image" />
                    </div>
                    <div className="footer_column">
                        <h3 className="footer_title common_reg small_p">Меню</h3>
                        <ul className="footer_links">
                            <li className="footer_link" onClick={() => openModal("contacts")}>
                                <span className="link_hover common_reg">Контакты</span>
                            </li>
                            <li className="footer_link" onClick={() => openModal("delivery")}>
                                <span className="link_hover common_reg">Доставка</span>
                            </li>
                            <li className="footer_link" onClick={() => openModal("delivery")}>
                                <span className="link_hover common_reg">Оплата</span>
                            </li>
                        </ul>
                    </div>



                    <div className="footer_column footer_column--left">
                        <h3 className="footer_title common_reg small_p">Контакты</h3>
                        <div className="contact_info">
                            <div className="contact_item">
                                <i className="fas fa-phone"></i>
                                <span className="common_reg">+375 33 677-92-60</span>
                            </div>
                            <div className="contact_item">
                                <i className="fas fa-phone"></i>
                                <span className="common_reg">+375 29 120-11-90</span>
                            </div>
                            <div className="contact_item">
                                <i className="fas fa-envelope"></i>
                                <span className="common_reg">info@maxistore.by</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer_bottom">
                    <p className="copyright">© Maxistore 2024 | Все права защищены</p>
                    <p className="developer">Разработано для вас</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
