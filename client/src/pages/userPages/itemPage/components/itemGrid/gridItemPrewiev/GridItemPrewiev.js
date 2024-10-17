import "./GridItemPrewiev.scss";
import Rating from "../../../../../../components/rating/Rating";
import { ITEM_PREVIEW_ROUTE } from "../../../../../appRouter/Const";
import { NavLink } from "react-router-dom";
import { fetchAllAttributeValuesByItemId } from "../../../../../../http/itemAttributeApi";
import { fetchReviewByItemIdAndIsShowed } from "../../../../../../http/reviewApi";
import { useState, useEffect } from "react";

function GridItemPrewiev({ itemPrice, item, currentFilter }) {
    const [attributesValue, setAttributeValue] = useState([]);
    // const [revies, setRevies] = useState([]);
    const [avarigeMark, setAvarigeMark] = useState([]);
    const [reviesLenght, setReviesLenght] = useState(0);
    const [isRight, setIsRight] = useState(true);

    useEffect(() => {
        fetchAllAttributeValuesByItemId(item.id).then(data => {
            setAttributeValue(data || []);
        });
        fetchReviewByItemIdAndIsShowed(item.id).then(data => {
            // setRevies(data || [])
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
    useEffect(() => {
        if (Number(item.price) > itemPrice.min && Number(item.price) < itemPrice.max) {
            setIsRight(checkFilters(currentFilter, attributesValue));
        } else {
            setIsRight(false);
        }
    }, [currentFilter, itemPrice])

    function checkFilters(currentFilter, attributesValue) {
        // Группируем элементы currentFilter по attributeId
        const groupedFilters = currentFilter.reduce((acc, filter) => {
            if (!acc[filter.attributeId]) {
                acc[filter.attributeId] = [];
            }
            acc[filter.attributeId].push(filter);
            return acc;
        }, {});

        // Проверяем каждый attributeId
        for (let attributeId in groupedFilters) {
            // Ищем элемент в attributesValue с таким attributeId
            const matchingAttribute = attributesValue.find(item =>
                Number(item.attributeId) === Number(attributeId)
            );

            // Если не найден элемент в attributesValue с таким attributeId, пропускаем этот фильтр
            if (matchingAttribute) {
                // Проверяем, есть ли хотя бы одно совпадение по valueId для всех объектов с этим attributeId
                const hasMatchingValueId = groupedFilters[attributeId].some(filter =>
                    Number(filter.valueId) === Number(matchingAttribute.valueId)
                );

                // Если ни одно valueId не совпадает, возвращаем false
                if (!hasMatchingValueId) {
                    return false;
                }
            }
        }

        // Если все условия выполнены, возвращаем true
        return true;
    }


    return (
        <>
            {
                isRight ?
                    <NavLink to={ITEM_PREVIEW_ROUTE + "/" + item.id}>

                        <div className="grid_item_prewiev">
                            <div className="item_prewiev_container">
                                <img className="item_prewiev_image" src={process.env.REACT_APP_API_URL + item.image} alt="image" />
                            </div>
                            <p className="item_prewiev_paragraph tiny_p">{item.isExist ? "Есть в наличии" : "Нет в наличии"}</p>
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
                            <p className="item_prewiev_paragraph jura_semi-medium_p">{item.price} руб.</p>
                        </div>
                    </NavLink >

                    : null}
        </>
    )
}

export default GridItemPrewiev;