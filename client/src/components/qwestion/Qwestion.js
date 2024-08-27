import "./Qwestion.scss";
import ArrowImage from "../../assets/images/arrow.png";
import ArrowOpenImage from "../../assets/images/arrowOpen.png";
import { useState } from "react";

export default function Qwestion() {
    const qwestionData = [
        { label: "Можно ли забрать заказ самостоятельно из вашего офиса или со склада?", description: "Можно, но перед этим необходимо позвонить нам для согласования времени вашего приезда. Информацию по адресу самомовывоза и наш телефон  вы можете найти в шапке сайта." },
        { label: "Должен ли я оплачивать доставку в случае отказа?", description: "Можно, но перед этим необходимо позвонить нам для согласования времени вашего приезда. Информацию по адресу самомовывоза и наш телефон  вы можете найти в шапке сайта." },
        { label: "Существуют ли скидки на корпоративные покупки?", description: "Можно, но перед этим необходимо позвонить нам для согласования времени вашего приезда. Информацию по адресу самомовывоза и наш телефон  вы можете найти в шапке сайта." },
        { label: "Почему доставка в вашем магазине платная?", description: "Можно, но перед этим необходимо позвонить нам для согласования времени вашего приезда. Информацию по адресу самомовывоза и наш телефон  вы можете найти в шапке сайта." }
    ]

    const [activeIndex, setActiveIndex] = useState(null);
    const activeToggle = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section className="qwestion">
            <ul className="qwestion_list">
                {qwestionData.map((item, index) => (
                    <li key={index} className={`list_item ${activeIndex === index ? 'active' : 'unactive'}`} onClick={() => activeToggle(index)}>
                        <div className="qwestion_header">
                            <img className="header_image-closed" src={ArrowImage} alt="arrow" />
                            <img className="header_image-open" src={ArrowOpenImage} alt="arrow" />
                            <h3 className="header_label medium_p">{item.label}</h3>
                        </div>
                        <div className="qwestion_description">
                            <p className="description_text medium_p">{item.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section >
    )
}