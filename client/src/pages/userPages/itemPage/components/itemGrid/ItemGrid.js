import "./ItemGrid.scss";
import GridItemPrewiev from "./gridItemPrewiev/GridItemPrewiev";
import { fetchAllItemByKategoryId, fetchAllItemByPodKategoryId } from "../../../../../http/itemApi";
import { useState, useEffect } from "react";

function ItemGrid({ isFilterOpen, itemPrice, currentFilter, kategryId, podKategryId }) {
    const [items, setItems] = useState([]);

    useEffect(() => {

        if (podKategryId) {
            fetchAllItemByPodKategoryId(podKategryId).then(data => {
                setItems(data || []);
            })
        } else {

            fetchAllItemByKategoryId(kategryId).then(data => {
                setItems(data || []);
            })
        }

    }, [])

    return (
        <div className="item_grid_container">
            {/* <div className="grid_container">
                <p className="container_paragraph-unactive jura_semi-medium_p">Сортировать по:</p>
                <p className="container_paragraph jura_semi-medium_p">популярности</p>
                <p className="container_paragraph jura_semi-medium_p">цене</p>
                <p className="container_paragraph jura_semi-medium_p">рейтингу</p>
            </div> */}
            {items.length > 0 ?
                <div className={`grid_container_grid ${isFilterOpen ? "" : "active"}`}>
                    {items.map((item) => (
                        <GridItemPrewiev itemPrice={itemPrice} item={item} currentFilter={currentFilter} />
                    ))}
                </div>
                : <p className="item_grid_container_notFound tiny_p">Товаров по вашим критериям пока нет</p>
            }
        </div>
    )
}

export default ItemGrid;