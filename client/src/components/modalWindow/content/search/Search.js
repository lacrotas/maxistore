import "./Search.scss";
import SearchImage from "../../../../assets/images/search.png";

function Search() {
    return (
        <div className="search">
            <input className="search_input medium_p" type="text" placeholder="Введите название товара" />
            <img className="search_image" src={SearchImage} alt="search" />
        </div>
    )
}

export default Search;