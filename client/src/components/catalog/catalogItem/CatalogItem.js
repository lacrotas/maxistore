import "./CatalogItem.scss";
export default function CatalogItem({ counter, image, label, item_counter }) {
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
        <div className="catalog_item">
            <div className="item_container">
                <h2 className="item_counter medium_p">{counter}</h2>
                <p className="item_paragraph--counter medium_p">{item_counter} {`${getWordEnding(item_counter, endings)}`}</p>
                <p className="item_paragraph--name small_h">{label}</p>
                <img className="item_image" src={process.env.REACT_APP_API_URL + image} alt="catalog" />
            </div>
        </div>
    );
}