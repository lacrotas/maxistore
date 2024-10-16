import "./Search.scss";
import SearchImage from "../../../../assets/images/search.png";
import { NavLink } from "react-router-dom";
import { ITEM_SEARCH_ROUTE } from "../../../../pages/appRouter/Const"
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Search() {
    const [itemName, setItemName] = useState("");
    const history = useHistory();

    const handleClick = (newPath) => {
        history.push({
            pathname: ITEM_SEARCH_ROUTE,
            state: { path: newPath },
        });
        window.location.reload();
    };

    return (
        <div className="search">
            <input value={itemName} onChange={(e) => { setItemName(e.target.value) }} className="search_input medium_p" type="text" placeholder="Введите название товара" />
            <NavLink onClick={() => handleClick({ name: itemName })} to={{ pathname: ITEM_SEARCH_ROUTE, state: { path: { name: itemName } } }}>
                <img className="search_image" src={SearchImage} alt="search" />
            </NavLink>
        </div>
    )
}

export default Search;