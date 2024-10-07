import "./GridItemPrewiev.scss";
import Rating from "../../../../../../components/rating/Rating";
import InteractiveRating from "../../../../../../components/InteractiveRating/InteractiveRating";
import { ITEM_PREVIEW_ROUTE } from "../../../../../appRouter/Const";
import { NavLink } from "react-router-dom";

function GridItemPrewiev({ item }) {
    return (
        <NavLink to={ITEM_PREVIEW_ROUTE + "/" + item.id}>
            <div className="grid_item_prewiev">
                <div className="item_prewiev_container">
                    <img className="item_prewiev_image" src={process.env.REACT_APP_API_URL + item.image} alt="image" />
                </div>
                <p className="item_prewiev_paragraph jura_semi-medium_p">{item.name}</p>
                <div className="item_prewiev_rating">
                    <Rating rating={4.5} />
                    <p className="rating_paragraph">30 отзывов</p>
                    {/* <InteractiveRating rating={3} /> */}
                </div>
                <p className="item_prewiev_paragraph jura_semi-medium_p">{item.price} р.</p>
            </div>
        </NavLink>
    )
}

export default GridItemPrewiev;