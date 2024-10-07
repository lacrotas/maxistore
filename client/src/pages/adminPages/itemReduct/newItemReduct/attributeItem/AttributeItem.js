import { fetchAllAttributeValuesByAttributeId } from "../../../../../http/attributeValue";
import { useState, useEffect } from "react";
import EmptyCheck from "../../../../../assets/images/emptyCheck.png";
import FullCheck from "../../../../../assets/images/fullCheck.png";
import "./AttributeItem.scss";

function AttributeItem({ item, setChoosenValueArr, choosenValueArr }) {
    const [attributeValues, setAttributeValues] = useState([]);
    const [isAttributeActive, setIsAttributeActive] = useState(-1);

    useEffect(() => {
        fetchAllAttributeValuesByAttributeId(item.id).then(data => setAttributeValues(data));
    }, [])


    function setAllValues(id, index) {
        setIsAttributeActive(index);
        if (choosenValueArr.length > 0) {
            const found = choosenValueArr.findIndex(element => element.attributeId == item.id);
            console.log(found);
            if (found != -1) {
                choosenValueArr.splice(found, 1);
            }
            choosenValueArr.push({ attributeId: item.id, valueId: id });

        } else {
            choosenValueArr.push({ attributeId: item.id, valueId: id });
            setChoosenValueArr(choosenValueArr);
        }
    }

    return (
        <div className="attributeItem">
            <p className="jura_semi-medium_p">{item.name}</p>
            {attributeValues.map((item, index) => (
                <div className={`attributeItem_description ${isAttributeActive === index ? "active" : "unactive"}`} onClick={() => setAllValues(item.id, index)}>
                    <img className="description_image-close" src={EmptyCheck} alt="empty" />
                    <img className="description_image-open" src={FullCheck} alt="full" />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}
export default AttributeItem;