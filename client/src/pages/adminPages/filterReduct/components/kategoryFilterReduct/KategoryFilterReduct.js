import "./KategoryFilterReduct.scss";
import Footer from "../../../../../components/footer/Footer";
import Headers from "../../../../../components/header/Header";
import CustomLabel from "../../../../../customUI/customLabel/CustomLabel";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import CustomButton from "../../../../../customUI/customButton/CustomButton";
import { postFilterForKategory, fetchAllAttributeByKategoryId } from "../../../../../http/filterApi";
import { LOGIN_ROUTE } from "../../../../appRouter/Const";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FilterItem from "./filterItem/FilterItem";

function KategoryFilterReduct() {
    const location = useLocation();
    const { name, image, id } = location.state || {};
    const history = useHistory();

    const [newAttributeValue, setNewAttributeValue] = useState();
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        fetchAllAttributeByKategoryId(id).then((data) => setAttributes(data));
    }, []);

    function setNewAttributeForKategory() {
        postFilterForKategory({ name: newAttributeValue, kategoryId: id }).then((data) => {
            if (data) {
                alert("Данный аттрибут успешно добавлен");
                window.location.reload();
            } else {
                alert("Ваша сессия завершена, авторизируйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        })
    }

    return (
        <>
            <Headers isAdminHeader={true} />
            <CustomLabel text={"Редактирование аттрибутов: " + name} />
            <div className="filter_label_container">
                <input className="container_input tiny_p" value={newAttributeValue} onChange={(e) => setNewAttributeValue(e.target.value)} type="text" placeholder="Введите название аттрибута" />
                <CustomButton dealOnClick={setNewAttributeForKategory} text={"Добавить"} />
            </div>
            {attributes.length > 0 ? (
                <div className="kategoryFilter_container">
                    <p className="jura_medium_bold">{name}</p>
                    {attributes.map((item, index) => (
                        <FilterItem name={item.name} id={item.id} key={index} />
                    ))}
                </div>
            ) : <></>}
            <Footer />
        </>
    )
}

export default KategoryFilterReduct;