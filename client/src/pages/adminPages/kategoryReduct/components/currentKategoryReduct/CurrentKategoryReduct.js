import "./CurrentKategoryReduct.scss";
import CustomLabel from "../../../../../customUI/customLabel/CustomLabel";
import Footer from "../../../../../components/footer/Footer";
import Headers from "../../../../../components/header/Header";
import CustomButton from "../../../../../customUI/customButton/CustomButton";
import CurrentKategoryReductItem from "./currentKategoryReductItem/CurrentKategoryReductItem";
import UpdateImage from "../../../../../assets/images/UpdateImage.png";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { fetchAllKategoryByMainKategoryId, postKategory, deleteMainKategory, updateMainKategory, deleteKategoryByMainKategoryId } from "../../../../../http/KategoryApi";
import ModalWindow from "../../../../../components/modalWindow/ModalWindow";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { KATEGORY_REDUCT_ROUTE } from "../../../../appRouter/Const";

function CurrentKategoryReduct() {
    const location = useLocation();
    const history = useHistory();
    const { name, image, id } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [podKategory, setPodKategory] = useState([]);
    const [newImage, setImage] = useState(image ? process.env.REACT_APP_API_URL + image : UpdateImage);
    const [newImageFile, setNewImageFile] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setNewImageFile(file);
        // setImageFile(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const [newKategoryValue, setNewKategoryValue] = useState("");
    const [currentKategoryName, setCurrentKategoryName] = useState(name || "");

    useEffect(() => {
        fetchAllKategoryByMainKategoryId(id).then(data => setPodKategory(data));
    }, []);

    function deletePodKategory(id) {
        const result = prompt("Если вы удалите данную подкатегорию удаляться все подкатегории и товары связанные с ней. Если уверены введите слово \"да\"", []);
        if (result) {
            // podKategory.forEach((item) => {
            //     deleteKategoryByMainKategoryId(item.id);
            // })
            deleteKategoryByMainKategoryId(id);
            alert("Данная подкатегория успешно удаленна");
            window.location.reload();
        }
    }
    function deletekategory() {
        const result = prompt("Если вы удалите данную категорию удаляться все подподкатегории и товары связанные с ней. Если уверены введите слово \"да\"", []);
        if (result) {
            podKategory.forEach((item) => {
                deleteKategoryByMainKategoryId(item.id);
            })
            deleteMainKategory(id);
            alert("Данная категория успешно удаленна");
            history.push(KATEGORY_REDUCT_ROUTE);
        }
    }
    function updateKategory() {
        const formData = new FormData()
        formData.append('name', currentKategoryName);
        if (newImageFile) {
            formData.append('image', newImageFile);
        }
        updateMainKategory(id, formData);
        alert("Данная категория успешно отредактированна");
        history.push(KATEGORY_REDUCT_ROUTE);
    }

    function addPodKategory() {
        if (newKategoryValue) {
            const formData = new FormData();
            formData.append('name', newKategoryValue);
            formData.append('mainKategoryId', id);
            postKategory(formData);
            window.location.reload();
        }
    }

    return (
        <>
            {isModalOpen ? <ModalWindow type={"addCategory"} setIsModalActive={setIsModalOpen} /> : <></>}
            <Headers isAdminHeader={true} />
            <CustomLabel text={"Редактирование категории: " + name} />
            <div className="current_kategory_content">
                <div className="current_slider_reduct-file">
                    <input className="content_input tiny_p" type="text" value={currentKategoryName} onChange={(e) => setCurrentKategoryName(e.target.value)} placeholder="Название категории" />
                    <input className="content_input--file" type="file" id="fileInput" onChange={handleImageChange} />
                </div>
                <div className="catalog_item">
                    <div className="item_container">
                        <h2 className="item_counter medium_p">1</h2>
                        <p className="item_paragraph--counter medium_p">15 товаров</p>
                        <p className="item_paragraph--name small_h">{currentKategoryName}</p>
                        <img className="item_image" src={newImage} alt="catalog" />
                    </div>
                </div>
            </div>
            <div className="current_kategory_buttons">
                <CustomButton dealOnClick={deletekategory} text={"Удалить"} />
                <CustomButton dealOnClick={updateKategory} text={"Применить"} />
            </div>
            <CustomLabel text={"Подкатегории для " + name} />
            <div className="current_kategory_container">
                <input className="container_input tiny_p" value={newKategoryValue} onChange={(e) => setNewKategoryValue(e.target.value)} type="text" placeholder="Введите название подкатегории" />
                <CustomButton dealOnClick={addPodKategory} text={"Добавить"} />
            </div>
            <div className="current_kategory_content_podkategory">
                {
                    podKategory.map((item, index) => (
                        <CurrentKategoryReductItem removeItem={deletePodKategory} item={item} key={index} />
                    ))
                }
            </div>
            <Footer />
        </>
    )
}

export default CurrentKategoryReduct;