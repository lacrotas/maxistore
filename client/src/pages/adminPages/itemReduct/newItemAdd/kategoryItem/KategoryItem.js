import { useState, useEffect } from "react";
import { fetchAllKategoryByMainKategoryId, fetchAllKategoryByPodKategoryId } from "../../../../../http/KategoryApi";
import CloseImage from "../../../../../assets/images/arrowOpen.png";
import OpenImage from "../../../../../assets/images/arrow.png";
import "./KategoryItem.scss";
import PodKategoryItem from "./podKategoryItem/PodKategoryItem";
import CustomButton from "../../../../../customUI/customButton/CustomButton";

function KategoryItem({ item, setChoosenKategory }) {
    const [allKategory, setAllKategory] = useState([]);
    const [isKategoryActive, setIsKategoryActive] = useState(-1);

    useEffect(() => {
        // Получаем все категории
        fetchAllKategoryByMainKategoryId(item.id).then(data => { setAllKategory(data) });
    }, []);

    return (
        <div>
            {allKategory.map((kategoryitem, index) => (
                <div>
                    <div className={`kategoryItem ${isKategoryActive === index ? "active" : "unactive"}`} onClick={() => setIsKategoryActive(index)}>
                        <img className="kategoryItem--close" src={CloseImage} alt="close" />
                        <img className="kategoryItem--open" src={OpenImage} alt="open" />
                        <p className="kategoryItem_paragraph tiny_p">{kategoryitem.name}</p>
                        <CustomButton dealOnClick={setChoosenKategory} value={{ type: "kategory", mainKategoryId: item.id, id: kategoryitem.id, name: kategoryitem.name }} text={"Выбрать"} />
                    </div>
                    {isKategoryActive === index ? <PodKategoryItem setChoosenKategory={setChoosenKategory} mainKategoryId={item.id} item={kategoryitem} /> : <></>}
                </div>
            ))}
        </div>
    )
}

export default KategoryItem;