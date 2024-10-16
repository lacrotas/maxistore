import "./ItemGrid.scss";
import GridItemPrewiev from "./gridItemPrewiev/GridItemPrewiev";
import { fetchAllItemByName } from "../../../../http/itemApi";
import { useState, useEffect } from "react";

function ItemGrid({ name }) {
    const [items, setItems] = useState([]);
    // substring

    useEffect(() => {
        fetchAllItemByName(name).then(data => setItems(data || []))
    }, [])

    return (
        <div className="item_grid_container_search">
            <p className="container_paragraph jura_semi-medium_p">Результат поиска по: {name}</p>

            <div className="grid_container_grid">
                {items.map((item) => (
                    <GridItemPrewiev item={item} />
                ))}
            </div>
        </div>
    )
}

export default ItemGrid;