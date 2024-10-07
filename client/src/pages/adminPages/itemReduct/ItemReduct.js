import Headers from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import CustomLabel from "../../../customUI/customLabel/CustomLabel";
import CustomButton from "../../../customUI/customButton/CustomButton";
import { useState, useEffect } from "react";
import SearchImage from "../../../assets/images/search.png"
import "./ItemReduct.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { NEW_ITEM_POST_ROUTE } from "../../appRouter/Const";
import { fetchAllItem } from "../../../http/itemApi";
import ItemPreview from "./itemPreview/ItemPreview";

function ItemReduct() {
    const [itemName, setItemName] = useState("");

    const [itemsArr, setItemsArr] = useState([]);

    useEffect(() => {
        fetchAllItem().then(data => {
            setItemsArr(data);
        })
    }, []);

    return (
        <>
            <Headers isAdminHeader={true} />
            <CustomLabel text={"Редактирование товаров"} />
            <div className="itemReduct">
                <div className="itemReduct_container">
                    <div className="item_label_container">
                        <input className="container_input tiny_p" value={itemName} onChange={(e) => setItemName(e.target.value)} type="text" placeholder="Введите название товара" />
                        <img className="item_label_container_image" src={SearchImage} alt="search" />
                    </div>
                    <NavLink to={NEW_ITEM_POST_ROUTE}>
                        <CustomButton text={"Добавить товар"} />
                    </NavLink>
                </div>
                <div>
                    {itemsArr.map((item) => (
                        <ItemPreview item={item} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ItemReduct;