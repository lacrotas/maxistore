const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Создаем транспорт для отправки почты
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // Для локального тестирования
  }
});

router.post('/send-order', async (req, res) => {
  const { orderData, items, subject, html } = req.body;
  console.log('Получен заказ:', { 
    client: orderData.name, 
    phone: orderData.phone,
    itemsCount: items.length
  });

  try {
    // Проверка наличия обязательных данных
    if (!orderData || !items) {
      throw new Error('Отсутствуют данные заказа');
    }

    const mailOptions = {
      from: `"Магазин" <${process.env.EMAIL_USER}>`,
      to: process.env.ORDER_RECEIVER_EMAIL,
      subject: subject || `Новый заказ от ${orderData.name}`,
      html: html || generateDefaultEmailHtml(orderData, items)
    };

    console.log('Попытка отправки письма с настройками:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', info.response);
    
    res.status(200).json({ 
      success: true,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Ошибка отправки:', {
      message: error.message,
      stack: error.stack,
      response: error.response
    });
    
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

function generateDefaultEmailHtml(orderData, items) {
  const itemsHtml = items.map(item =>
    `<tr>
      <td>${item.name}</td>
      <td>${item.quantity} шт.</td>
      <td>${item.price * item.quantity} руб</td>
    </tr>`
  ).join('');

  const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const deliveryCost = orderData.delivery === 'Доставка' ? 10 : 0;
  const totalWithDelivery = total + deliveryCost;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50;">📦 Новый заказ!</h1>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #2c3e50; margin-top: 0;">Информация о клиенте</h2>
        <p><strong>👤 Клиент:</strong> ${orderData.name}</p>
        <p><strong>📞 Телефон:</strong> ${orderData.phone}</p>
        <p><strong>📍 Адрес:</strong> ${orderData.delivery === 'Самовывоз' ? 'Самовывоз' : orderData.address}</p>
        <p><strong>🚚 Доставка:</strong> ${orderData.delivery}</p>
        <p><strong>💳 Оплата:</strong> ${orderData.payment}</p>
        <p><strong>📝 Комментарий:</strong> ${orderData.comment || 'нет'}</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #2c3e50; margin-top: 0;">🛒 Товары</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="text-align: left; padding: 8px;">Название</th>
              <th style="text-align: left; padding: 8px;">Количество</th>
              <th style="text-align: left; padding: 8px;">Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>
      
      <div style="background: #e8f4fd; padding: 15px; border-radius: 5px;">
        <h3 style="color: #2c3e50; margin-top: 0;">💰 Итого</h3>
        <p><strong>Товары:</strong> ${total} руб</p>
        <p><strong>Доставка:</strong> ${deliveryCost} руб</p>
        <p><strong style="font-size: 1.2em;">Всего:</strong> ${totalWithDelivery} руб</p>
      </div>
    </div>
  `;
}

module.exports = router;