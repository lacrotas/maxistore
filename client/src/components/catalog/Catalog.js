import ButtonImage from "../../assets/images/button.png";
import "./Catalog.scss";
import CatalogItem from "./catalogItem/CatalogItem";
import { fetchAllMainKategory } from "../../http/KategoryApi";
import { fetchAllItemByMainKategoryId } from "../../http/itemApi"
import { useState, useEffect } from "react";

export default function Catalog() {
    const [allKategory, setAllKategory] = useState([]);
    const [itemsCounter, setItemsCounter] = useState([]);

    useEffect(() => {
        fetchAllMainKategory().then(data => {
            setAllKategory(data);
            data.map((item) => {
                fetchAllItemByMainKategoryId(item.id).then(data => {
                    const itemsLengh = data.length;
                    setItemsCounter(prevState => [...prevState, itemsLengh]);
                })
            })
        })
    }, [])
   
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
            {allKategory.map((item, index) => (
                <CatalogItem counter={"0" + (index + 1)} image={item.image} label={item.name} item_counter={itemsCounter[index]} />
            ))}
        </section>
    );
}