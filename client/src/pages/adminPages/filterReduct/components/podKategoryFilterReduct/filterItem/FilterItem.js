import ArrowImage from "../../../../../../assets/images/arrow.png";
import ArrowOpenImage from "../../../../../../assets/images/arrowOpen.png";
import { useState, useEffect } from "react";
import "./FilterItem.scss";
import CustomButton from "../../../../../../customUI/customButton/CustomButton";
import { deleteAttribute } from "../../../../../../http/filterApi";
import { fetchAllAttributeValuesByAttributeId, deleteAttributeValue } from "../../../../../../http/attributeValue";
import { LOGIN_ROUTE } from "../../../../../appRouter/Const";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ModalWindow from "../../../../../../components/modalWindow/ModalWindow";
import CrossImage from "../../../../../../assets/images/cross.png";

function FilterItem({ name, id }) {
    const [activeIndex, setActiveIndex] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [attributeArray, setAttributeArray] = useState([]);
    const history = useHistory();
    const [attributeValues, setAttributesValues] = useState([]);

    useEffect(() => {
        fetchAllAttributeValuesByAttributeId(id).then(data => setAttributesValues(data));
    }, []);

    function destroyAttribute() {
        const result = prompt("Если вы удалите данный аттрибут удалятся все значения этого аттрибута. Если уверены введите слово \"да\"", []);
        if (result) {
            attributeValues.map((item) => deleteAttributeValue(item.id))
            deleteAttribute(id).then((data) => {
                if (data) {
                    alert("Данный аттрибут успешно добавлен");
                    window.location.reload();
                } else {
                    alert("Ваша сессия завершена, авторизируйтесь повторно");
                    history.push(LOGIN_ROUTE);
                }
            })
        }
    }

    function destroyAttributeValue(id) {
        const result = prompt("Если вы удалите данное значение для аттрибута он удалиться в каждом товаре где задан. Если уверены введите слово \"да\"", []);
        if (result) {
            deleteAttributeValue(id).then((data) => {
                if (data) {
                    alert("Данное значение аттрибута успешно удалено");
                    window.location.reload();
                } else {
                    alert("Ваша сессия завершена, авторизируйтесь повторно");
                    history.push(LOGIN_ROUTE);
                }
            })
        }
    }

    return (
        <>
            {isModalActive ? <ModalWindow type={"addAttributeValue"} setIsModalActive={setIsModalActive} value={id} /> : <></>}
            <div className={`filterItem ${activeIndex ? 'active' : 'unactive'}`}>
                <div className="filterItem_header" onClick={() => setActiveIndex(!activeIndex)}>
                    <div className="filterItem_header_container">
                        <img className="header_image-closed" src={ArrowImage} alt="arrow" />
                        <img className="header_image-open" src={ArrowOpenImage} alt="arrow" />
                        <p>{name}</p>
                    </div>
                    <CustomButton dealOnClick={destroyAttribute} text={"Удалить"} />
                </div>
                <div className="filterItem_description">
                    {attributeValues.map((item, index) => (
                        <div className="filterItem_description_values">
                            <p>{item.name}</p>
                            <img className="values_image" onClick={() => destroyAttributeValue(item.id)} src={CrossImage} alt="cross" />
                        </div>
                    ))}
                    <CustomButton text={"Добавить значение"} dealOnClick={setIsModalActive} value={true} />
                </div>
            </div>
        </>
    )
}
export default FilterItem;