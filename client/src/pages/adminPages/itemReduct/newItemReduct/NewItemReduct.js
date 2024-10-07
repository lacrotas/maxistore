import Headers from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import "./NewItemReduct.scss";
import { useState, useEffect } from "react";
import { fetchAllMainKategory } from "../../../../http/KategoryApi";
import { fetchAllAttributeByKategoryId, fetchAllAttributeByPodKategoryId } from "../../../../http/filterApi";
import { postItem } from "../../../../http/itemApi";
import { postItemAttribute } from "../../../../http/itemAttributeApi";
import { postItemImage, fetchAllItemImageByItemId, deleteItemImage } from "../../../../http/itemImageApi";
import PlusImage from "../../../../assets/images/plus.png";
import EmptyImage from "../../../../assets/images/UpdateImage.png";
import ModalWindow from "../../../../components/modalWindow/ModalWindow";
import KategoryItem from "./kategoryItem/KategoryItem";
import CloseArrow from "../../../../assets/images/arrow.png";
import OpenArrow from "../../../../assets/images/arrowOpen.png";
import CustomButton from "../../../../customUI/customButton/CustomButton";
import AttributeItem from "./attributeItem/AttributeItem";
import { LOGIN_ROUTE, ITEM_REDUCT_ROUTE } from "../../../appRouter/Const";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function NewItemReduct() {
    const location = useLocation();
    const path = location.state?.path;

    const [newItemName, setNewItemName] = useState(path.name || "");
    const [cost, setCost] = useState(path.price || "");
    const [description, setDescription] = useState(path.description || "");

    const [mainCategory, setMainCategory] = useState([]);
    const [activeKategoryIndex, setActiveKategoryIndex] = useState(-1);
    const [choosenKategory, setChoosenKategory] = useState(false);
    const history = useHistory();
    const [isModalActive, setIsModalActive] = useState();

    /*images*/
    const [imageLenght, setImageLength] = useState([]);
    const [imageIndex, setImageIndex] = useState("");
    const [mainImage, setMainImage] = useState(process.env.REACT_APP_API_URL + path.image || false);

    function setActiveMainKategoryHtml(mainCategory) {
        if (mainCategory.length > 0) {
            mainCategory.forEach((item) => {
                if ((item.id == path.mainKategoryId) && mainCategory.indexOf(item) != -1) {
                    setActiveKategoryIndex(mainCategory.indexOf(item));
                }
            })
        }
    }
    const handleimageLenghtClick = () => {
        const newElement = false; // Или любое другое значение, которое нужно добавить
        setImageLength(prevState => [...prevState, newElement]);
    };
    function setNewImage(index) {
        setImageIndex(index);
        setIsModalActive(true);
    }
    function setNewMainImage(e) {
        const file = e.target.files[0];
        setMainImage(file);
    }

    const [attibutes, setAttributes] = useState([]);

    function setAttribuValues(item) {
        setChoosenValueArr([]);
        if (item === false) {
            setChoosenKategory(false);
            setAttributes([]);
            return null;
        }
        setChoosenKategory(item);
        if (item.type === "kategory") {
            fetchAllAttributeByKategoryId(item.id).then(data => setAttributes(data))
        } else {
            fetchAllAttributeByPodKategoryId(item.id).then(data => setAttributes(data))
        }
    }
    useEffect(() => {
        // Получаем все основные категории
        fetchAllMainKategory().then(data => {
            setMainCategory(data);
            setActiveMainKategoryHtml(data);
        });
        fetchAllItemImageByItemId(path.id).then((data) => {
            setImageLength(data);
        })
    }, []);

    function addImageToArray(file) {
        if (file === "delete") {
            imageLenght.splice(imageIndex, 1);
        } else {
            imageLenght[imageIndex] = file;
        }
        setImageLength(imageLenght);

    }

    const [choosenValueArr, setChoosenValueArr] = useState([]);

    function updatenewItem() {
        const formData = new FormData();
        formData.append("name", newItemName);
        formData.append("kategoryId", choosenKategory.id);
        formData.append("podKategoryId", choosenKategory.podid);
        formData.append("image", mainImage);
        formData.append("price", cost);
        formData.append("isExist", true);
        formData.append("isShowed", true);

        // update images
        fetchAllItemImageByItemId(path.id).then((data) => {
            //delete old image
            data.forEach((item, index) => {
                if (imageLenght.length > index) {
                    if (imageLenght[index].name) {
                        deleteItemImage(item.id).then(data => { })
                    }
                } else {
                    deleteItemImage(item.id);
                }
            })
            //add newImage
            imageLenght.forEach((item, index) => {
                if (data.length > index) {
                }
                else {
                    const ItemImageFormData = new FormData();
                    ItemImageFormData.append("itemId", path.id);
                    ItemImageFormData.append("image", item);
                    postItemImage(ItemImageFormData);
                }
            })
        })

        // postItem(formData).then(data => {
        //     if (data) {
        //         choosenValueArr.map(item => {
        //             postItemAttribute({ itemId: data.id, attributeId: item.attributeId, valueId: item.valueId })
        //         })
        //         imageLenght.map(item => {
        //             const ItemImageFormData = new FormData();
        //             ItemImageFormData.append("itemId", data.id);
        //             ItemImageFormData.append("image", item);
        //             postItemImage(ItemImageFormData);
        //         })
        //         alert("Ваш товар успешно добавлен");
        //         history.push(ITEM_REDUCT_ROUTE);
        //     } else {
        //         alert("Ваша сессия завершена, авторизируйтесь повторно");
        //         history.push(LOGIN_ROUTE);
        //     }
        // });
    }

    return (
        <>
            {isModalActive ? <ModalWindow type="reductImage" addImageToArray={addImageToArray} setIsModalActive={setIsModalActive} /> : <></>}
            <Headers isAdminHeader={true} />
            <div className="newItem">
                <input className="newItem_input jura_semi-medium_p" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} type="text" placeholder="Введите название товара" />
                <div className="newItem_container">
                    <div className="container_image">
                        <div className="image_container--left">
                            {imageLenght.map((item, index) => (
                                <img className="image_image--main" key={index} onClick={() => setNewImage(index)} src={item.name ? URL.createObjectURL(item) : item.image ? process.env.REACT_APP_API_URL + item.image : EmptyImage} alt="empty" />
                            ))}
                            <img className="image_image--plus" onClick={() => handleimageLenghtClick()} src={PlusImage} alt="plus" />
                        </div>
                        <div className="current_slider_reduct-file">
                            <input type="file" id="fileInput" className="file-input" onChange={(e) => setNewMainImage(e)} style={{ display: 'none' }} />
                            <img className="file_image" src={mainImage.name ? URL.createObjectURL(mainImage) : mainImage ? mainImage : EmptyImage} alt="updateImage" onClick={() => document.getElementById('fileInput').click()} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div className="container_description">
                        <p className="description_paragraph jura_medium_bold">Описание товара</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="description_textarea jura_semi-medium_p" placeholder="введите описание товара" />
                    </div>
                </div>
                <div className="newItem_chooseKategory">
                    {choosenKategory ?
                        <div className="newItem_chooseKategory_rechoose">
                            <p className=" rechoose_paragraph jura_medium_bold">Вы выбрали категорию {choosenKategory.name}</p>
                            <CustomButton dealOnClick={setAttribuValues} value={false} text={"Перевыбрать категорию"} />
                        </div>
                        :
                        <p className="jura_medium_bold">Выберите категорию вашего товара</p>
                    }

                    {!choosenKategory && mainCategory.length > 0 && mainCategory.map((mainCategoryItem, index) => (
                        <div key={index} className={`mainKategory_container ${activeKategoryIndex === index ? "active" : "unactive"}`} onClick={() => setActiveKategoryIndex(index)}>
                            <div className="container_header">
                                <img className="header_image-close" src={CloseArrow} alt="close" />
                                <img className="header_image-open" src={OpenArrow} alt="open" />
                                <p className="jura_semi-medium_p">{mainCategoryItem.name}</p>
                            </div>
                            {activeKategoryIndex === index ?
                                <div className="container_description">
                                    <KategoryItem kategoryPodKategoryItem={{ kategoryId: path.kategoryId, podKategoryId: path.podKategoryId }} choosenValueArr={choosenValueArr} setChoosenKategory={setAttribuValues} item={mainCategoryItem} />
                                </div> : <></>}
                        </div>
                    ))}
                </div>
                <div className="newItem_haracteristic">
                    <p className="jura_medium_bold">Характеристики</p>
                    {attibutes.map((item, index) => (
                        <AttributeItem key={index} choosenValueArr={choosenValueArr} setChoosenValueArr={setChoosenValueArr} item={item} />
                    ))}
                </div>
            </div>
            <div className="newItem_sum">
                <input className="newItem_sum jura_semi-medium_p" value={cost} onChange={(e) => setCost(e.target.value)} type="text" placeholder="Введите цену" />
                <CustomButton dealOnClick={updatenewItem} text={"Применить изменения"} />
            </div>
            <Footer />
        </>
    )
}

export default NewItemReduct;