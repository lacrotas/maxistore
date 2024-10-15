import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import CustomLabel from "../../../customUI/customLabel/CustomLabel";
import CustomButton from "../../../customUI/customButton/CustomButton";
import "./KategoryReduct.scss";
import KategoryItemPreview from "./components/kategoryItemPreview/KategoryItemPreview";
import { useState, useEffect } from "react";
import { fetchAllMainKategory, postMainKategory } from "../../../http/KategoryApi";
import { LOGIN_ROUTE } from "../../appRouter/Const";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function KategoryReduct() {
    const [mainKategory, setMainKategory] = useState([]);
    const [newMainKategoryName, setNewMainKategoryName] = useState("");
    const history = useHistory();

    useEffect(() => {
        fetchAllMainKategory().then(data => setMainKategory(data));
    }, []);

    function AddNewMainCategory() {
        const formData = new FormData()
        formData.append('name', newMainKategoryName);
        postMainKategory(formData).then(data => {
            if (data) {
                alert("Новая категория добавлена");
                window.location.reload();
            } else {
                alert("Ваша ссесия завершена авторизуйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        })

    }

    return (
        <>
            < Header isAdminHeader={true} />
            <CustomLabel text={"Редактирование категорий"} />
            <div className="kategory">
                <div className="kategory_label_container">
                    <input className="container_input tiny_p" value={newMainKategoryName} onChange={(e) => setNewMainKategoryName(e.target.value)} type="text" placeholder="Введите название категории" />
                    <CustomButton dealOnClick={AddNewMainCategory} text={"Добавить"} />
                </div>
                {mainKategory.map((item, index) => (
                    <KategoryItemPreview name={item.name} id={item.id} image={item.image} key={index} />
                ))}
            </div>
            <Footer />
        </>
    );
}

export default KategoryReduct;