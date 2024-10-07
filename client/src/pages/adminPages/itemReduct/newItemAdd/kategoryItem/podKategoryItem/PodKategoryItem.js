import { useState, useEffect } from "react";
import { fetchAllKategoryByPodKategoryId } from "../../../../../../http/KategoryApi";
import CustomButton from "../../../../../../customUI/customButton/CustomButton";
import "./PodKategoryItem.scss";

function PodKategoryItem({ item, setChoosenKategory, mainKategoryId }) {
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
                    <p className="podkategoryItem_paragraph tiny_p">{podItem.name}</p>
                    <CustomButton dealOnClick={setChoosenKategory} value={{ type: "podkategory", mainKategoryId: mainKategoryId, id: item.id, podid: podItem.id, name: podItem.name }} text={"Выбрать"} />
                </div>
            ))}
        </div>
    )
}

export default PodKategoryItem;