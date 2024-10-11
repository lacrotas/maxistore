import { fetchAllAttributeValuesByAttributeId } from "../../../../../http/attributeValue";
import { fetchAllAttributeValuesByItemId } from "../../../../../http/itemAttributeApi";
import { useState, useEffect } from "react";
import EmptyCheck from "../../../../../assets/images/emptyCheck.png";
import FullCheck from "../../../../../assets/images/fullCheck.png";
import "./AttributeItem.scss";

function AttributeItem({ itemId, item, setChoosenValueArr, choosenValueArr, newArrayToChange }) {
    let isMonted = true;
    const [itemAttributeValues, setItemAttributeValues] = useState([]);
    const [isAttributeActive, setIsAttributeActive] = useState(-1);

    useEffect(() => {
        if (isMonted) {
            fetchAllAttributeValuesByItemId(itemId).then((itemAttribute) => {
                fetchAllAttributeValuesByAttributeId(item.id).then(itemAttributeValue => {
                    setItemAttributeValues(itemAttributeValue);
                    itemAttributeValue.map((item, index) => {
                        itemAttribute.map((itemAttribute) => {
                            if (Number(itemAttribute.valueId) === Number(item.id)) {
                                setIsAttributeActive(index);
                            }
                        })
                    })
                });
            })

            isMonted = false;
        }
    }, [])


    function setAllValues(id, index) {
        setIsAttributeActive(index);
        const found = newArrayToChange.findIndex(element => element.attributeId == item.id);
        if (found != -1) {
            newArrayToChange.splice(found, 1);
        }
        newArrayToChange.push({ attributeId: item.id, valueId: id });
        setChoosenValueArr(newArrayToChange);
    }

    return (
        <div className="attributeItem">
            <p className="jura_semi-medium_p">{item.name}</p>
            {itemAttributeValues.map((item, index) => (
                <div key={index} className={`attributeItem_description ${isAttributeActive === index ? "active" : "unactive"}`} onClick={() => setAllValues(item.id, index)}>
                    <img className="description_image-close" src={EmptyCheck} alt="empty" />
                    <img className="description_image-open" src={FullCheck} alt="full" />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}
export default AttributeItem;