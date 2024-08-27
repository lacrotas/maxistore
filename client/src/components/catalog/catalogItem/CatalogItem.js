import "./CatalogItem.scss";
export default function CatalogItem({ counter, image, label, item_counter }) {
    return (
        <div className="catalog_item">
            <div className="item_container">
                <h2 className="item_counter medium_p">{counter}</h2>
                <p className="item_paragraph--counter medium_p">{item_counter} товаров</p>
                <p className="item_paragraph--name small_h">{label}</p>
                <img className="item_image" src={image} alt="catalog" />
            </div>
        </div>
    );
}