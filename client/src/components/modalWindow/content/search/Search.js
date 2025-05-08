// import "./Search.scss";
// import { NavLink } from "react-router-dom";
// import { ITEM_SEARCH_ROUTE } from "../../../../pages/appRouter/Const"
// import { useState } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { FiSearch } from 'react-icons/fi';

// function Search() {
//     const [itemName, setItemName] = useState("");
//     const history = useHistory();

//     const handleClick = (newPath) => {
//         history.push({
//             pathname: ITEM_SEARCH_ROUTE,
//             state: { path: newPath },
//         });
//         window.location.reload();
//     };

//     return (
//         <div className="search">
//             <input value={itemName} onChange={(e) => { setItemName(e.target.value) }} className="search_input tiny_p common_reg" type="text" placeholder="Введите название товара" />
//             <NavLink onClick={() => handleClick({ name: itemName })} to={{ pathname: ITEM_SEARCH_ROUTE, state: { path: { name: itemName } } }}>
//                 <FiSearch className="icon" />
//             </NavLink>
//         </div>
//     )
// }

// export default Search;
import "./Search.scss";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ITEM_SEARCH_ROUTE } from "../../../../pages/appRouter/Const";
import { FiSearch } from 'react-icons/fi';
import { NavLink } from "react-router-dom";

function Search() {
    const [itemName, setItemName] = useState("");
    const history = useHistory();

    const handleSearch = () => {
        if (itemName.trim()) {
            history.push({
                pathname: ITEM_SEARCH_ROUTE,
                state: { path: { name: itemName } }
            });
            window.location.reload();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search">
            <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="search_input tiny_p common_reg"
                type="text"
                placeholder="Введите название товара"
            />
            <NavLink
                to={{ pathname: ITEM_SEARCH_ROUTE, state: { path: { name: itemName } } }}
                onClick={handleSearch}
                className="search-icon-link"
            >
                <FiSearch className="icon" />
            </NavLink>
        </div>
    );
}

export default Search;
