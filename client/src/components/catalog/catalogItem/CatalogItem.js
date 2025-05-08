import "./CatalogItem.scss";
import { ITEM_MAIN_ROUTE } from "../../../pages/appRouter/Const";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function CatalogItem({ itemId, counter, image, label, item_counter }) {
    const endings = ['товар', 'товара', 'товаров'];

    function getWordEnding(number, words) {
        const cases = [2, 0, 1, 1, 1, 2];
        return words[
            (number % 100 > 4 && number % 100 < 20)
                ? 2
                : cases[Math.min(number % 10, 5)]
        ];
    }

    return (
        <NavLink to={{ pathname: ITEM_MAIN_ROUTE + "/" + itemId, state: { path: { name: label } } }}>
            <div className="catalog_item">
                <div className="item_container">
                    <h2 className="item_counter medium_p common_reg">{counter}</h2>
                    <p className="item_paragraph--counter medium_p common_reg">{item_counter} {`${getWordEnding(item_counter, endings)}`}</p>
                    <p className="item_paragraph--name small_h title_bold">{label}</p>
                    <img className="item_image" src={process.env.REACT_APP_API_URL + image} alt="catalog" />
                </div>
            </div>
        </NavLink >
    );
}