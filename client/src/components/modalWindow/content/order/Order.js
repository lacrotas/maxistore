// import "./Order.scss";
// import CustomButton from "../../../../customUI/customButton/CustomButton";
// import CustomInput from "../../../../customUI/customInput/CustomInput";
// import CustomSelect from "../../../../customUI/customSelect/CustomSelect";

// function Order() {
//     return (
//         <div className="order">
//             <h3 className="order_label small_h">Оформление заказа</h3>
//             <div className="order_container">
//                 <div className="order_info--left">
//                     <CustomInput playceholder={"ФИО"} />
//                     <CustomInput playceholder={"Номер телефона"} />
//                     <CustomInput playceholder={"Адрес"} />
//                     <div className="order_info_container">
//                         <CustomSelect label={"Метод доставки"} values={["Самовывоз", "Доставка"]} />
//                         <CustomSelect label={"Метод оплаты"} values={["Картой", "Наличными"]} />
//                     </div>
//                 </div>
//                 <div className="order_info--right">
//                     <textarea className="order_right-textarea tiny_p" placeholder="Комментарий к заказу" />
//                 </div>
//             </div>
//             <div className="order_final">
//                 <p className="order_final_paragraph small_h">Сумма к оплате: 840руб</p>
//                 <CustomButton text={"Оформить заказ"} />
//             </div>
//         </div>
//     )
// }

// export default Order;

import { useState } from "react";
import "./Order.scss";
import { FaUser, FaPhone, FaMapMarkerAlt, FaTruck, FaMoneyBillWave, FaComment } from "react-icons/fa";

function Order() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        delivery: 'Самовывоз',
        payment: 'Картой',
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        // Здесь обработка отправки формы
        console.log('Заказ оформлен:', formData);
    };

    return (
        <div className="order-modal">
            <div className="order-header">
                <h2 className="order-title title_bold">Оформление заказа</h2>
                <div className="order-steps">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label common_reg">Контакты</span>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label common_reg">Доставка</span>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${step >= 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label common_reg">Оплата</span>
                    </div>
                </div>
            </div>

            <div className="order-body">
                {/* Шаг 1: Контактные данные */}
                {step === 1 && (
                    <div className="form-section">
                        <div className="input-group">
                            <label className="input-label">
                                <FaUser className="input-icon" />
                                <span className="title_bold">ФИО</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input common_reg"
                                placeholder="Иванов Иван Иванович"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">
                                <FaPhone className="input-icon" />
                                <span className="title_bold">Телефон</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-input common_reg"
                                placeholder="+375 (__) ___ __ __"
                                required
                            />
                        </div>
                    </div>
                )}

                {/* Шаг 2: Доставка */}
                {step === 2 && (
                    <div className="form-section">
                        <div className="select-group">
                            <label className="input-label">
                                <FaTruck className="input-icon" />
                                <span className="title_bold title_bold">Способ доставки</span>
                            </label>
                            <select
                                name="delivery"
                                value={formData.delivery}
                                onChange={handleChange}
                                className="form-select common_reg"
                            >
                                <option value="Самовывоз" className="common_reg">Самовывоз (ул. Стебенева 2А)</option>
                                <option value="Доставка" className="common_reg">Курьерская доставка</option>
                            </select>
                        </div>

                        {formData.delivery === 'Доставка' && (
                            <div className="input-group">
                                <label className="input-label">
                                    <FaMapMarkerAlt className="input-icon" />
                                    <span className="title_bold">Адрес доставки</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="form-input common_reg"
                                    placeholder="г. Минск, ул. Примерная, д. 1"
                                    required
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <label className="input-label">
                                <FaComment className="input-icon" />
                                <span className="title_bold">Комментарий к заказу</span>
                            </label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                className="form-textarea"
                                placeholder="Укажите дополнительные пожелания..."
                                rows="3"
                            />
                        </div>
                    </div>
                )}

                {/* Шаг 3: Оплата */}
                {step === 3 && (
                    <div className="form-section">
                        <div className="select-group">
                            <label className="input-label">
                                <FaMoneyBillWave className="input-icon" />
                                <span className="title_bold">Способ оплаты</span>
                            </label>
                            <select
                                name="payment"
                                value={formData.payment}
                                onChange={handleChange}
                                className="form-select common_reg"
                            >
                                <option value="Картой common_reg">Картой онлайн</option>
                                <option value="Наличными common_reg">Наличными при получении</option>
                            </select>
                        </div>

                        <div className="order-summary">
                            <div className="summary-row">
                                <span className="common_reg">Товары (3)</span>
                                <span className="common_reg">840 руб</span>
                            </div>
                            <div className="summary-row">
                                <span className="common_reg">Доставка</span>
                                <span className="common_reg">{formData.delivery === 'Самовывоз' ? 'Бесплатно' : '10 руб'}</span>
                            </div>
                            <div className="summary-row total">
                                <span className="common_reg">Итого к оплате</span>
                                <span className="common_reg">{formData.delivery === 'Самовывоз' ? '840 руб' : '850 руб'}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="order-footer">
                {step > 1 && (
                    <button className="nav-btn prev-btn" onClick={prevStep}>
                        Назад
                    </button>
                )}

                {step < 3 ? (
                    <button className="nav-btn next-btn" onClick={nextStep}>
                        Далее
                    </button>
                ) : (
                    <button className="submit-btn" onClick={handleSubmit}>
                        Подтвердить заказ
                        <span className="btn-arrow">→</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Order;