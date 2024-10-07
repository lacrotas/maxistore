import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import CustomLabel from "../../../customUI/customLabel/CustomLabel";
import "./FilterReduct.scss";
import KategoryItemPreview from "./components/kategoryItemPreview/KategoryItemPreview";
import { useState, useEffect } from "react";
import { fetchAllMainKategory } from "../../../http/KategoryApi";

function FilterReduct() {
    const [mainKategory, setMainKategory] = useState([]);

    useEffect(() => {
        fetchAllMainKategory().then(data => setMainKategory(data));
    }, []);

    return (
        <>
            < Header isAdminHeader={true} />
            <CustomLabel text={"Редактирование фильтров"} />
            <div className="kategory">
                {mainKategory.map((item, index) => (
                    <KategoryItemPreview name={item.name} id={item.id} image={item.image} key={index} />
                ))}
            </div>
            <Footer />
        </>
    );
}

export default FilterReduct;