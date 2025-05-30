import { useState } from "react";
import "./Order.scss";
import { FaUser, FaPhone, FaMapMarkerAlt, FaTruck, FaMoneyBillWave, FaComment, FaCheckCircle } from "react-icons/fa";

function Order({ value, onOrderComplete, closeModal }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        delivery: 'Самовывоз',
        payment: 'Картой',
        comment: ''
    });
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep = (currentStep) => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!formData.name.trim()) newErrors.name = 'Пожалуйста, введите ФИО';
            if (!formData.phone.trim()) newErrors.phone = 'Пожалуйста, введите телефон';
        }

        if (currentStep === 2 && formData.delivery === 'Доставка' && !formData.address.trim()) {
            newErrors.address = 'Пожалуйста, введите адрес доставки';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        // Проверяем все шаги перед отправкой
        let isValid = true;
        for (let i = 1; i <= 3; i++) {
            isValid = isValid && validateStep(i);
        }

        if (!isValid) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        try {
            // Отправка в Telegram
            await sendTelegramNotification(formData, value);

            // Отправка на почту
            await sendEmailNotification(formData, value);

            // Очищаем корзину
            onOrderComplete();

            // Показываем модальное окно успеха
            setIsSuccess(true);

            console.log('Заказ оформлен:', formData, value);
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            alert('Произошла ошибка при оформлении заказа');
        }
    };

    function generateEmailHtml(orderData, items) {
        const itemsHtml = items.map(item =>
            `<tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity} шт.</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${item.price * item.quantity} руб</td>
            </tr>`
        ).join('');

        const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
        const deliveryCost = orderData.delivery === 'Доставка' ? 10 : 0;
        const totalWithDelivery = total + deliveryCost;

        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h1 style="color: #2c3e50; text-align: center;">📦 Новый заказ!</h1>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #eee;">
                    <h2 style="color: #2c3e50; margin-top: 0;">Информация о клиенте</h2>
                    <p><strong>👤 Клиент:</strong> ${orderData.name}</p>
                    <p><strong>📞 Телефон:</strong> ${orderData.phone}</p>
                    <p><strong>📍 Адрес:</strong> ${orderData.delivery === 'Самовывоз' ? 'Самовывоз' : orderData.address}</p>
                    <p><strong>🚚 Способ доставки:</strong> ${orderData.delivery}</p>
                    <p><strong>💳 Способ оплаты:</strong> ${orderData.payment}</p>
                    <p><strong>📝 Комментарий:</strong> ${orderData.comment || 'нет'}</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #eee;">
                    <h2 style="color: #2c3e50; margin-top: 0;">🛒 Товары</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <th style="text-align: left; padding: 8px;">Название</th>
                                <th style="text-align: center; padding: 8px;">Количество</th>
                                <th style="text-align: right; padding: 8px;">Сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                </div>
                
                <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; border: 1px solid #d1e7ff;">
                    <h3 style="color: #2c3e50; margin-top: 0;">💰 Итого к оплате</h3>
                    <p><strong>Товары:</strong> ${total} руб</p>
                    <p><strong>Доставка:</strong> ${deliveryCost} руб</p>
                    <p style="font-size: 1.1em;"><strong>Всего:</strong> ${totalWithDelivery} руб</p>
                </div>
                
                <p style="font-size: 0.9em; color: #7f8c8d; text-align: center; margin-top: 20px;">
                    Это письмо сформировано автоматически, пожалуйста, не отвечайте на него
                </p>
            </div>
        `;
    }

    async function sendEmailNotification(orderData, items) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/order/send-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderData,
                    items,
                    subject: `Новый заказ от ${orderData.name}`,
                    html: generateEmailHtml(orderData, items)
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Ошибка сервера при отправке заказа');
            }

            return result;
        } catch (error) {
            console.error('Ошибка отправки email:', {
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    async function sendTelegramNotification(orderData, items) {
        const botToken = '7446774548:AAH86Pusw8ggo7zlVKtW5fcj2FrQ4kmasQM';
        const chatId = '1035534494';

        const itemsText = items.map(item => {
            return `- ${item.name} (${item.quantity} шт.): ${item.price * item.quantity} руб`;
        }).join('\n');

        const total = items.reduce((sum, item) => {
            return sum + (Number(item.price) * item.quantity);
        }, 0);

        const message = `
            📦 *Новый заказ!*
            
            👤 *Клиент*: ${orderData.name}
            📞 *Телефон*: ${orderData.phone}
            📍 *Адрес*: ${orderData.delivery === 'Самовывоз' ? 'Самовывоз' : orderData.address}
            🚚 *Способ доставки*: ${orderData.delivery}
            💳 *Способ оплаты*: ${orderData.payment}
            📝 *Комментарий*: ${orderData.comment || 'нет'}

            🛒 *Товары*:
            ${itemsText}

            💰 *Итого*: ${total} руб
        `;

        try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
        } catch (error) {
            console.error('Ошибка отправки в Telegram:', error);
        }
    }

    const closeSuccessModal = () => {
        setIsSuccess(false);
        closeModal();
    };

    return (
        <div className="order-modal">
            {/* Success Modal */}
            {isSuccess && (
                <div className="success-modal-overlay">
                    <div className="success-modal">
                        <FaCheckCircle className="success-icon" />
                        <h2 className="success-title">Заказ успешно оформлен!</h2>
                        <p className="success-message">Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
                        <button className="success-btn" onClick={closeSuccessModal}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}

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
                                className={`form-input common_reg ${errors.name ? 'error' : ''}`}
                                placeholder="Иванов Иван Иванович"
                                required
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
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
                                className={`form-input common_reg ${errors.phone ? 'error' : ''}`}
                                placeholder="+375 (__) ___ __ __"
                                required
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
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
                                    className={`form-input common_reg ${errors.address ? 'error' : ''}`}
                                    placeholder="г. Минск, ул. Примерная, д. 1"
                                />
                                {errors.address && <span className="error-message">{errors.address}</span>}
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
                                <span className="common_reg">Товары ({value.reduce((sum, item) => sum + item.quantity, 0)})</span>
                                <span className="common_reg">
                                    {value.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0)} руб
                                </span>
                            </div>
                            <div className="summary-row">
                                <span className="common_reg">Доставка</span>
                                <span className="common_reg">{formData.delivery === 'Самовывоз' ? 'Бесплатно' : '10 руб'}</span>
                            </div>
                            <div className="summary-row total">
                                <span className="common_reg">Итого к оплате</span>
                                <span className="common_reg">
                                    {formData.delivery === 'Самовывоз'
                                        ? `${value.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0)} руб`
                                        : `${value.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0) + 10} руб`}
                                </span>
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