import "./Order.scss";
import CustomButton from "../../../../customUI/customButton/CustomButton";
import CustomInput from "../../../../customUI/customInput/CustomInput";
import CustomSelect from "../../../../customUI/customSelect/CustomSelect";

function Order() {
    return (
        <div className="order">
            <h3 className="order_label small_h">Оформление заказа</h3>
            <div className="order_container">
                <div className="order_info--left">
                    <CustomInput playceholder={"ФИО"} />
                    <CustomInput playceholder={"Номер телефона"} />
                    <CustomInput playceholder={"Адрес"} />
                    <div className="order_info_container">
                        <CustomSelect label={"Метод доставки"} values={["Самовывоз", "Доставка"]} />
                        <CustomSelect label={"Метод оплаты"} values={["Картой", "Наличными"]} />
                    </div>
                </div>
                <div className="order_info--right">
                    <textarea className="order_right-textarea tiny_p" placeholder="Комментарий к заказу" />
                </div>
            </div>
            <div className="order_final">
                <p className="order_final_paragraph small_h">Сумма к оплате: 840руб</p>
                <CustomButton text={"Оформить заказ"} />
            </div>
        </div>
    )
}

export default Order;