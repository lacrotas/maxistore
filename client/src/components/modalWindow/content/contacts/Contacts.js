import "./Contacts.scss";
import TelegramImage from "../../../../assets/images/socialLinks/logos_telegram.png";
import ViberImage from "../../../../assets/images/socialLinks/basil_viber-solid.png";
import VkImage from "../../../../assets/images/socialLinks/entypo-social_vk-with-circle.png";
import InstagramImage from "../../../../assets/images/socialLinks/skill-icons_instagram.png";

function Contacts() {
    return (
        <div className="contact">
            <div className="contacts_left">
                <div className="left_containe--contacts">
                    <h3 className="contacts_label small_h">Контакты</h3>
                    <p className="contacts_paragraph small_p">+375 (33) 677-92-60</p>
                    <p className="contacts_paragraph small_p">+375 (29) 120-11-90</p>
                </div>
                <div className="left_social">
                    <img className="social_image" src={TelegramImage} about="telegram" />
                    <img className="social_image" src={InstagramImage} about="insta" />
                    <img className="social_image" src={VkImage} about="vk" />
                    <img className="social_image" src={ViberImage} about="viber" />
                </div>
                <div className="left_button">
                    <a className="left_button_text small_p">
                        Частые вопросы
                    </a>
                </div>
            </div>
            <div className="contacts_right">
                <h3 className="contacts_label small_h">Адрес пункта самовывоза</h3>
                <p className="small_p">г. Минск, ул. Стебенева 2А офис 20, второй этаж</p>
                <iframe className="right_map" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d5892.93732914814!2d27.543617407306055!3d53.835016272158306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zMjAsINGD0LsuINCh0YLQtdCx0LXQvdGR0LLQsCAy0LAsINCc0LjQvdGB0Lo!5e0!3m2!1sru!2sby!4v1723908206821!5m2!1sru!2sby" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default Contacts;