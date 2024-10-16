import "./ItemGrid.scss";
import GridItemPrewiev from "./gridItemPrewiev/GridItemPrewiev";
import { fetchAllItemByKategoryId, fetchAllItemByPodKategoryId } from "../../../../../http/itemApi";
import { useState, useEffect } from "react";

function ItemGrid({ currentFilter, kategryId, podKategryId }) {
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
            <div className="grid_container">
                <p className="container_paragraph-unactive jura_semi-medium_p">Сортировать по:</p>
                <p className="container_paragraph jura_semi-medium_p">популярности</p>
                <p className="container_paragraph jura_semi-medium_p">цене</p>
                <p className="container_paragraph jura_semi-medium_p">рейтингу</p>
            </div>
            <div className="grid_container_grid">
                {items.map((item) => (
                    <GridItemPrewiev item={item} currentFilter={currentFilter} />
                ))}
            </div>
        </div>
    )
}

export default ItemGrid;