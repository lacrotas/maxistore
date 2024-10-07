import { useState, useEffect } from "react";
import { fetchAllKategoryByMainKategoryId, fetchAllKategoryByPodKategoryId } from "../../../../../http/KategoryApi";
import CloseImage from "../../../../../assets/images/arrowOpen.png";
import OpenImage from "../../../../../assets/images/arrow.png";
import "./KategoryItem.scss";
import PodKategoryItem from "./podKategoryItem/PodKategoryItem";
import CustomButton from "../../../../../customUI/customButton/CustomButton";

function KategoryItem({ kategoryPodKategoryItem, item, setChoosenKategory }) {
    const [allKategory, setAllKategory] = useState([]);
    const [isKategoryActive, setIsKategoryActive] = useState(-1);

    function setActiveMainKategoryHtml(mainCategory) {
        if (mainCategory.length > 0) {
            mainCategory.forEach((item) => {
                if ((item.id == kategoryPodKategoryItem.kategoryId) && mainCategory.indexOf(item) != -1 && kategoryPodKategoryItem.podKategoryId === "undefined") {
                    setChoosenKategory({ type: "kategory", id: item.id, name: item.name })
                }
            })
        }
    }

    useEffect(() => {
        // Получаем все основные категории
        fetchAllKategoryByMainKategoryId(item.id).then(data => {
            setAllKategory(data);
            setActiveMainKategoryHtml(data);
        });
    }, []);


    return (
        <div>
            {allKategory.map((item, index) => (
                <div>
                    <div className={`kategoryItem ${isKategoryActive === index ? "active" : "unactive"}`} onClick={() => setIsKategoryActive(index)}>
                        <img className="kategoryItem--close" src={CloseImage} alt="close" />
                        <img className="kategoryItem--open" src={OpenImage} alt="open" />
                        <p className="kategoryItem_paragraph tiny_p">{item.name}</p>
                        <CustomButton dealOnClick={setChoosenKategory} value={{ type: "kategory", id: item.id, name: item.name }} text={"Выбрать"} />
                    </div>
                    {isKategoryActive === index ? <PodKategoryItem setChoosenKategory={setChoosenKategory} item={item} /> : <></>}
                </div>
            ))}
        </div>
    )
}

export default KategoryItem;