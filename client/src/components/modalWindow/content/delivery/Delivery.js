import "./Delivery.scss";
import Maestro from "../../../../assets/images/payment/maestro.png";
import Master from "../../../../assets/images/payment/master.png";
import Mir from "../../../../assets/images/payment/mir.png";
import Viza from "../../../../assets/images/payment/viza.png";

function Delivery() {
    return (
        <div className="delivery">
            <div className="delivery_contacts">
                <h3 className="contacts_label small_h">Адрес пункта самовывоза</h3>
                <p className="small_p">г. Минск, ул. Стебенева 2А офис 20, второй этаж</p>
                <iframe className="contacts_map" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d5892.93732914814!2d27.543617407306055!3d53.835016272158306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zMjAsINGD0LsuINCh0YLQtdCx0LXQvdGR0LLQsCAy0LAsINCc0LjQvdGB0Lo!5e0!3m2!1sru!2sby!4v1723908206821!5m2!1sru!2sby" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="delivery_payment">
                <div className="payment_container">
                    <h3 className="container_label small_h">Доставка</h3>
                    <p className="container_paragraph small_p">Доставка производиться по всей территории РБ,
                        нашей транспортной компанией. Вы также можете произвести самовывоз товара, предварительно позвонив нам.</p>
                </div>
                <div className="payment_container">
                    <h3 className="container_label small_h">Оплата</h3>
                    <p className="container_paragraph small_p">Оплата производиться при получении получении
                        товара, после проверки вами качества.</p>
                </div>
                <div className="payment_container">
                    <h3 className="container_label small_h">Мы принимаем</h3>
                    <div className="container_payment">
                        <img src={Maestro} className="payment_item" alt="Maestro" />
                        <img src={Mir} className="payment_item" alt="Mir" />
                        <img src={Viza} className="payment_item" alt="Viza" />
                        <img src={Master} className="payment_item" alt="Master" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Delivery