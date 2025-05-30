import "./GridItemPrewiev.scss";
import Rating from "../../../../../components/rating/Rating";
import { ITEM_PREVIEW_ROUTE } from "../../../../appRouter/Const";
import { NavLink } from "react-router-dom";
import { fetchReviewByItemIdAndIsShowed } from "../../../../../http/reviewApi";
import { useState, useEffect } from "react";
import { FiShoppingCart, FiCheck } from "react-icons/fi";

function GridItemPrewiev({ item }) {
    const [avarigeMark, setAvarigeMark] = useState([]);
    const [reviesLenght, setReviesLenght] = useState(0);
    const [isAddedToBusket, setIsAddedToBusket] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


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

    function addToBasket() {
        setIsAddedToBusket(true);
        let basket = localStorage.getItem("maxiBasket") || "false";
        let newBasket = basket === "false" ? [] : basket.split(',');
        newBasket.push(item.id);
        localStorage.setItem('maxiBasket', newBasket);
    }

    return (
        <div
            className={`product-card ${isHovered ? 'hovered' : ''} ${!item.isExist ? 'out-of-stock' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`card-badge ${item.isExist ? 'in-stock' : 'out-of-stock'}`}>
                {item.isExist ? 'В наличии' : 'Нет в наличии'}
            </div>

            <NavLink to={ITEM_PREVIEW_ROUTE + "/" + item.id} className="card-image-link">
                <div className="card-image-container">
                    <img
                        src={process.env.REACT_APP_API_URL + item.image}
                        alt={item.name}
                        className="card-image"
                        loading="lazy"
                    />
                </div>
            </NavLink>

            <div className="card-content">
                <h3 className="card-title">{item.name}</h3>

                <div className="card-rating">
                    <Rating rating={avarigeMark} />
                    {reviesLenght > 0 ? (
                        <span className="reviews-count">{reviesLenght} отзывов</span>
                    ) : (
                        <span className="reviews-count">Нет отзывов</span>
                    )}
                </div>

                <div className="card-price">{item.price} ₽</div>

                <button
                    className={`add-to-cart ${isAddedToBusket ? 'added' : ''}`}
                    onClick={addToBasket}
                    disabled={!item.isExist}
                >
                    {isAddedToBusket ? (
                        <>
                            <FiCheck className="cart-icon" />
                            <span>В корзине</span>
                        </>
                    ) : (
                        <>
                            <FiShoppingCart className="cart-icon" />
                            <span>В корзину</span>
                        </>
                    )}
                </button>
            </div>
        </div>

        // <div className="grid_item_prewiev">
        //     <NavLink to={ITEM_PREVIEW_ROUTE + "/" + item.id} className="grid_item_prewiev-a">
        //         <div className="item_prewiev_container">
        //             <img className="item_prewiev_image" src={process.env.REACT_APP_API_URL + item.image} alt="image" />
        //         </div>
        //         <p className={`item_prewiev_paragraph tiny_p ${item.isExist ? "active" : "unactive"}`}>{item.isExist ? "Есть в наличии" : "Нет в наличии"}</p>
        //         <p className="item_prewiev_paragraph item_prewiev_paragraph-name jura_semi-medium_p">{item.name}</p>
        //         {reviesLenght !== 0 ?
        //             <div className="item_prewiev_rating">
        //                 <Rating rating={avarigeMark} />
        //                 <p className="rating_paragraph">{reviesLenght} отзывов</p>
        //             </div> :
        //             <div className="item_prewiev_rating">
        //                 <p className="rating_paragraph">Пока у данного товара нет отзывов</p>
        //             </div>
        //         }
        //         <p className="item_prewiev_paragraph jura_semi-medium_p">{item.price} руб.</p>
        //     </NavLink >

        //     <div className={`custom_button ${isAddedToBusket ? "active" : ""}`} onClick={() => addToBusket()}>
        //         <p className="custom_button_text tiny_p">{!isAddedToBusket ? "Добавить в корзину" : "Добавлен в корзину"}</p>
        //     </div>
        // </div>
    )
}

export default GridItemPrewiev;