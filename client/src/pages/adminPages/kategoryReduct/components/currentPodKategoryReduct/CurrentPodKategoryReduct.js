import "./CurrentKategoryReduct.scss";
import CustomLabel from "../../../../../customUI/customLabel/CustomLabel";
import Footer from "../../../../../components/footer/Footer";
import Headers from "../../../../../components/header/Header";
import CustomButton from "../../../../../customUI/customButton/CustomButton";
import CurrentKategoryReductItem from "./currentKategoryReductItem/CurrentKategoryReductItem";
import UpdateImage from "../../../../../assets/images/UpdateImage.png";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { fetchAllKategoryByPodKategoryId, postPodKategory, deletePodKategoryById, updateKategory, deleteKategoryByMainKategoryId } from "../../../../../http/KategoryApi";
import ModalWindow from "../../../../../components/modalWindow/ModalWindow";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { KATEGORY_REDUCT_ROUTE, LOGIN_ROUTE } from "../../../../appRouter/Const";

function CurrentPodKategoryReduct() {
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
        fetchAllKategoryByPodKategoryId(id).then(data => setPodKategory(data));
    }, []);

    //kategory
    function updateCurrentKategory() {
        const formData = new FormData()
        formData.append('name', currentKategoryName);
        if (newImageFile) {
            formData.append('image', newImageFile);
        }
        updateKategory(id, formData).then(data => {
            if (data) {
                console.log(data);
                alert("Данная подкатегория успешно отредактированна");
                history.push(KATEGORY_REDUCT_ROUTE);
            } else {
                alert("Ваша сессия завершена, авторизируйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        })
    }
    function deletekategory() {
        const result = prompt("Если вы удалите данную категорию удаляться все подподкатегории и товары связанные с ней. Если уверены введите слово \"да\"", []);
        if (result) {
            try {
                deleteKategoryByMainKategoryId(id);
                alert("Данная категория успешно удаленна");
                history.push(KATEGORY_REDUCT_ROUTE);
                window.location.reload();
            } catch {
                alert("Ваша сессия завершена, авторизируйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        }
    }
    //podcategory
    function deletePodKategory(id) {
        const result = prompt("Если вы удалите данную подподкатегорию удаляться все товары связанные с ней. Если уверены введите слово \"да\"", []);
        if (result) {
            deletePodKategoryById(id).then(data => {
                if (data) {
                    alert("Данная подкатегория успешно удаленна");
                    window.location.reload();
                } else {
                    alert("Ваша сессия завершена, авторизируйтесь повторно");
                    history.push(LOGIN_ROUTE);
                }
            })
        }
    }
    function addPodKategory() {
        if (newKategoryValue) {
            const formData = new FormData();
            formData.append('name', newKategoryValue);
            formData.append('kategoryId', id);
            postPodKategory(formData).then((data) => {
                if (data) {
                    console.log(data);
                    alert("Данная подподкатегория успешно добавленна");
                    window.location.reload();
                } else {
                    alert("Ваша сессия завершена, авторизируйтесь повторно");
                    history.push(LOGIN_ROUTE);
                }
            })
        }
    }

    const [podCategoryItem, setPodkategoryItem] = useState("");

    function openModal(item) {
        setPodkategoryItem(item);
        setIsModalOpen(true);
    }

    return (
        <>
            {isModalOpen ? <ModalWindow value={podCategoryItem} type={"addCategory"} setIsModalActive={setIsModalOpen} /> : <></>}
            <Headers isAdminHeader={true} />
            <CustomLabel text={"Редактирование подкатегории: " + name} />
            <div className="current_kategory_content">
                <div className="current_slider_reduct-file">
                    <input className="content_input tiny_p" type="text" value={currentKategoryName} onChange={(e) => setCurrentKategoryName(e.target.value)} placeholder="Название категории" />
                    <input className="content_input--file" type="file" id="fileInput" onChange={handleImageChange} />
                </div>
                <div className="podcategory_item">
                    <img className="item_image" src={newImage} alt="catalog" />
                    <div className="item_container-text">
                        <p className="item_paragraph--name small_h">{currentKategoryName}</p>
                    </div>
                </div>
            </div>
            <div className="current_kategory_buttons">
                <CustomButton dealOnClick={deletekategory} text={"Удалить"} />
                <CustomButton dealOnClick={updateCurrentKategory} text={"Применить"} />
            </div>
            <CustomLabel text={"Подкатегории для " + name} />
            <div className="current_kategory_container">
                <input className="container_input tiny_p" value={newKategoryValue} onChange={(e) => setNewKategoryValue(e.target.value)} type="text" placeholder="Введите название подкатегории" />
                <CustomButton dealOnClick={addPodKategory} text={"Добавить"} />
            </div>
            <div className="current_kategory_content_podkategory">
                {
                    podKategory.map((item, index) => (
                        <CurrentKategoryReductItem reductItem={openModal} removeItem={deletePodKategory} item={item} key={index} />
                    ))
                }
            </div>
            <Footer />
        </>
    )
}

export default CurrentPodKategoryReduct;