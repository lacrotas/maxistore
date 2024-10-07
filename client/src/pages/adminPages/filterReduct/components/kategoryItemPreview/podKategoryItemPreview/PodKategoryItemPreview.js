import CustomButton from "../../../../../../customUI/customButton/CustomButton";
import "./PodKategoryItemPreview.scss";
import ArrowImage from "../../../../../../assets/images/arrow.png";
import ArrowOpenImage from "../../../../../../assets/images/arrowOpen.png";
import { NavLink } from "react-router-dom";
import { CURRENT_KATEGORY_FILTER_REDUCT_ROUTE } from "../../../../../appRouter/Const";
import { fetchAllKategoryByPodKategoryId } from "../../../../../../http/KategoryApi";
import { useEffect, useState } from "react";

function PodKategoryItemPreview({ podKategory }) {
    const [qwestionData, setQwestionData] = useState([])
    useEffect(() => {
        fetchAllKategoryByPodKategoryId(podKategory.id).then(data => setQwestionData(data));
    }, []);
    const [activeIndex, setActiveIndex] = useState(false);
    return (
        <ul className="pod_kategory_item">
            <li className={`list_item ${activeIndex ? 'active' : 'unactive'}`}>
                <div className="qwestion_header">
                    <div className="item_container" onClick={() => setActiveIndex(!activeIndex)}>
                        <img className="header_image-closed" src={ArrowImage} alt="arrow" />
                        <img className="header_image-open" src={ArrowOpenImage} alt="arrow" />
                        <p className="jura_semi-medium_p">{podKategory.name}</p>
                    </div>
                    <div className="item_container">
                        <NavLink to={{ pathname: CURRENT_KATEGORY_FILTER_REDUCT_ROUTE, state: { name: podKategory.name, id: podKategory.id, image: podKategory.image } }} >
                            <CustomButton text={"Редактировать"} />
                        </NavLink>
                    </div>
                </div>
                <div className="qwestion_description">
                    {qwestionData.map((item, index) => (
                        <div className="item_container">
                            <p key={index}>{item.name}</p>
                            <NavLink to={{ pathname: CURRENT_KATEGORY_FILTER_REDUCT_ROUTE, state: { name: item.name, id: item.id, image: item.image } }} >
                                <CustomButton text={"Редактировать"} />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </li>
        </ul>
    )
}

export default PodKategoryItemPreview;