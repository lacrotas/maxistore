import CustomButton from "../../../../../customUI/customButton/CustomButton";
import "./KategoryItemPreview.scss";
import ArrowImage from "../../../../../assets/images/arrow.png";
import ArrowOpenImage from "../../../../../assets/images/arrowOpen.png";
import PodKategoryItemPreview from "../podKategoryItemPreview/PodKategoryItemPreview";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CURRENT_KATEGORY_REDUCT_ROUTE } from "../../../../appRouter/Const";
import { fetchAllKategoryByMainKategoryId, deleteKategoryByMainKategoryId, deleteMainKategory } from "../../../../../http/KategoryApi";

function KategoryItemPreview({ name, id, image }) {

    const [kategory, setKategory] = useState([]);

    useEffect(() => {
        fetchAllKategoryByMainKategoryId(id).then(data => setKategory(data));
    }, []);

    function deletekategory() {
        const result = prompt("Если вы удалите данную категорию удаляться все подподкатегории и товары связанные с ней. Если уверены введите слово \"да\"", []);
        if (result) {
            kategory.forEach((item) => {
                deleteKategoryByMainKategoryId(item.id);
            })
            deleteMainKategory(id);
            alert("Данная категория успешно удаленна");
            window.location.reload();
        }
    }

    const [activeIndex, setActiveIndex] = useState(false);
    return (
        <ul className="kategory_item">
            <li className={`list_item ${activeIndex ? 'active' : 'unactive'}`}>
                <div className="qwestion_header">
                    <div className="item_container" onClick={() => setActiveIndex(!activeIndex)}>
                        <img className="header_image-closed" src={ArrowImage} alt="arrow" />
                        <img className="header_image-open" src={ArrowOpenImage} alt="arrow" />
                        <p className="jura_semi-medium_p">{name}</p>
                    </div>
                    <div className="item_container">
                        <NavLink to={{ pathname: CURRENT_KATEGORY_REDUCT_ROUTE, state: { name: name, id: id, image: image } }} >
                            <CustomButton text={"Редактировать"} />
                        </NavLink>
                        <CustomButton dealOnClick={deletekategory} text={"Удалить"} />
                    </div>
                </div>
                <div className="qwestion_description">
                    {kategory.map((item, index) => (
                            <PodKategoryItemPreview key={index} podKategory={item} />
                    ))}
                </div>
            </li>
        </ul>
    )
}

export default KategoryItemPreview;