import "./GridItemPrewiev.scss";
import Rating from "../../../../../components/rating/Rating";
import { ITEM_PREVIEW_ROUTE } from "../../../../appRouter/Const";
import { NavLink } from "react-router-dom";
import { fetchReviewByItemIdAndIsShowed } from "../../../../../http/reviewApi";
import { useState, useEffect } from "react";

function GridItemPrewiev({ item }) {
    const [avarigeMark, setAvarigeMark] = useState([]);
    const [reviesLenght, setReviesLenght] = useState(0);

    useEffect(() => {
        fetchReviewByItemIdAndIsShowed(item.id).then(data => {
            setAvarigeMark(setRaiting(data));
            setReviesLenght(data.length);
        })
    }, []);
    function setRaiting(review) {
        let sum = 0;
        if (review) {
            review.map((item) => {
                sum += Number(item.mark);
            })
        }
        return (sum / Number(review.length));
    }


    return (

        <NavLink to={ITEM_PREVIEW_ROUTE + "/" + item.id}>

            <div className="grid_item_prewiev">
                <div className="item_prewiev_container">
                    <img className="item_prewiev_image" src={process.env.REACT_APP_API_URL + item.image} alt="image" />
                </div>
                <p className="item_prewiev_paragraph item_prewiev_paragraph-name jura_semi-medium_p">{item.name}</p>
                {reviesLenght !== 0 ?
                    <div className="item_prewiev_rating">
                        <Rating rating={avarigeMark} />
                        <p className="rating_paragraph">{reviesLenght} отзывов</p>
                    </div> :
                    <div className="item_prewiev_rating">
                        <p className="rating_paragraph">Пока у данного товара нет отзывов</p>
                    </div>
                }
                <p className="item_prewiev_paragraph jura_semi-medium_p">{item.price} р.</p>
            </div>
        </NavLink >

    )
}

export default GridItemPrewiev;