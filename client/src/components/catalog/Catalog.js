import ButtonImage from "../../assets/images/button.png";
import "./Catalog.scss";
import CatalogItem from "./catalogItem/CatalogItem";
import TrenImage from "../../assets/images/category/tren.png";
import BatutImage from "../../assets/images/category/batut.png";
import MassImage from "../../assets/images/category/mass.png";
import TenisImage from "../../assets/images/category/tenis.png";

export default function Catalog() {
    const category = [
        { image: TrenImage, label: "Тренажеры", item_counter: 100 },
        { image: TenisImage, label: "Теннисные столы", item_counter: 135 },
        { image: BatutImage, label: "Батуты", item_counter: 155 },
        { image: MassImage, label: "Массажные кресла", item_counter: 25 }
    ]
    return (
        <section className="catalog_section">
            <div className="catalog_container">
                <h2 className="container_label medium_h">Каталог <br />товаров от Maxistore</h2>
                <p className="container_paragraph medium_p">Наш интернет-магазин зарегистрирован в Торговом реестре РБ 18.07.2014г</p>
                <div className="container_button">
                    <img className="button_image" src={ButtonImage} alt="button" />
                    <p className="button_text medium_p">В каталог</p>
                </div>
            </div>
            {category.map((item, index) => (
                <CatalogItem counter={"0" + (index + 1)} image={item.image} label={item.label} item_counter={item.item_counter} />
            ))}
        </section>
    );
}