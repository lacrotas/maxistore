import { useState, useEffect } from "react";
import { fetchAllKategoryByPodKategoryId } from "../../../../../../http/KategoryApi";
import CustomButton from "../../../../../../customUI/customButton/CustomButton";
import "./PodKategoryItem.scss";

function PodKategoryItem({ item, setChoosenKategory }) {
    const [allKategory, setAllKategory] = useState([]);
    const [isKategoryActive, setIsKategoryActive] = useState(-1);

    useEffect(() => {
        // Получаем все основные категории
        fetchAllKategoryByPodKategoryId(item.id).then(data => { setAllKategory(data); });
    }, []);

    return (
        <div>
            {allKategory.map((podItem, index) => (
                <div className={`podkategoryItem ${isKategoryActive === index ? "active" : "unactive"}`} onClick={() => setIsKategoryActive(index)}>
                    <p className="podkategoryItem_paragraph tiny_p">{item.name}</p>
                    <CustomButton dealOnClick={setChoosenKategory} value={{ type: "podkategory", id: item.id, podid: podItem.id, name: podItem.name }} text={"Выбрать"} />
                </div>
            ))}
        </div>
    )
}

export default PodKategoryItem;