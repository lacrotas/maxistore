import Headers from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import "./NewItemReduct.scss";
import { useState, useEffect } from "react";
import { fetchAllAttributeValuesByItemId, postItemAttribute, deleteAttributeValue } from "../../../../http/itemAttributeApi";
import { fetchAllAttributeByKategoryId, fetchAllAttributeByPodKategoryId } from "../../../../http/filterApi";
import { postItemImage, fetchAllItemImageByItemId, deleteItemImage } from "../../../../http/itemImageApi";
import { deleteReviewByItemId } from "../../../../http/reviewApi";
import { updateItemById, deleteItemById } from "../../../../http/itemApi";
import PlusImage from "../../../../assets/images/plus.png";
import EmptyImage from "../../../../assets/images/UpdateImage.png";
import ModalWindow from "../../../../components/modalWindow/ModalWindow";
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
    const [activeValue, setActiveValue] = useState(path.isExist);
    const [showValue, setShowValue] = useState(path.isShowed);

    const [choosenKategory, setChoosenKategory] = useState(false);
    const history = useHistory();
    const [isModalActive, setIsModalActive] = useState();

    /*images*/
    const [imageLenght, setImageLength] = useState([]);
    const [imageIndex, setImageIndex] = useState("");
    const [mainImage, setMainImage] = useState(process.env.REACT_APP_API_URL + path.image || false);

    // attribute 
    const [attibutes, setAttributes] = useState([]);
    const [attibutesValues, setAttributesValues] = useState([]);

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


    useEffect(() => {
        // Получаем все основные категории
        fetchAllItemImageByItemId(path.id).then((data) => {
            setImageLength(data);
        });
        fetchAllAttributeValuesByItemId(path.id).then((data) => {
            setAttributesValues(data)
        });

        if (path.podKategoryId == "undefined") {
            fetchAllAttributeByKategoryId(path.kategoryId).then(data => {
                setAttributes(data);
            })
        } else {
            fetchAllAttributeByPodKategoryId(path.podKategoryId).then(data => {
                setAttributes(data);
            })
        }
    }, []);

    function addImageToArray(file) {
        if (file === "delete") {
            imageLenght.splice(imageIndex, 1);
        } else {
            imageLenght[imageIndex] = file;
        }
        setImageLength(imageLenght);

    }

    const [newChoosenValueArr, setNewChoosenValueArr] = useState([]);


    function updatenewItem() {
        const formData = new FormData();
        formData.append("name", newItemName);
        if (mainImage.name) {
            formData.append("image", mainImage);
        }
        formData.append("price", cost);
        formData.append("description", description);
        formData.append("isExist", activeValue);
        formData.append("isShowed", showValue);

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

        //update item attribute
        newChoosenValueArr.map((newItem) => {
            attibutesValues.map((oldItem) => {
                if (String(oldItem.attributeId) === String(newItem.attributeId)) {
                    deleteAttributeValue(oldItem.id);
                    postItemAttribute({ itemId: path.id, attributeId: newItem.attributeId, valueId: newItem.valueId });
                }
            })
        })
        // update item
        updateItemById(path.id, formData).then(data => {
            if (data) {
                alert("Ваш товар успешно отредактирован");
                history.push(ITEM_REDUCT_ROUTE);
            } else {
                alert("Ваша сессия завершена, авторизируйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        });
    }
    function deleteItem() {
        const result = prompt("Вы уверенные что хотите удалить товар, удаляться все отзывы к даномому товару. Если уверены введите слово \"да\"", []);
        if (result) {
            // delete reviews
            try{
            deleteReviewByItemId(path.id);
            }catch(e){
                
            }
            attibutesValues.map((item) => {
                deleteAttributeValue(item.id);
            })
            imageLenght.map(item => {
                deleteItemImage(item.id);
            })
            deleteItemById(path.id).then(data => {
                if (data) {
                    alert("Ваш товар успешно удален");
                    history.push(ITEM_REDUCT_ROUTE);
                } else {
                    alert("Ваша сессия завершена, авторизируйтесь повторно");
                    history.push(LOGIN_ROUTE);
                }
            })
        }
    }

    return (
        <>
            {isModalActive ? <ModalWindow type="reductImage" addImageToArray={addImageToArray} setIsModalActive={setIsModalActive} /> : <></>}
            <Headers isAdminHeader={true} />
            <div className="newItem">
                <div className="newItem_flex">
                    <p className={`flex_paragraph ${activeValue ? "active" : "unactive"}`} onClick={() => setActiveValue(!activeValue)}>{activeValue ? "Есть в наличие" : "Нет в наличии"}</p>
                    <p className={`flex_paragraph ${showValue ? "active" : "unactive"}`} onClick={() => setShowValue(!showValue)}>{showValue ? "Отображать на сайте" : "Не отображать на сайте"}</p>
                </div>
                {/* <p></p> */}
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
                <div className="newItem_haracteristic">
                    <p className="jura_medium_bold">Характеристики</p>
                    {attibutes.map((item, index) => (
                        <AttributeItem key={index} itemId={path.id} choosenValueArr={attibutesValues} newArrayToChange={newChoosenValueArr} setChoosenValueArr={setNewChoosenValueArr} item={item} />
                    ))}
                </div>
            </div>
            <div className="newItem_sum">
                <input className="newItem_sum jura_semi-medium_p" value={cost} onChange={(e) => setCost(e.target.value)} type="text" placeholder="Введите цену" />
                <CustomButton dealOnClick={deleteItem} text={"Удалить товар"} />
                <CustomButton dealOnClick={updatenewItem} text={"Применить изменения"} />
            </div>
            <Footer />
        </>
    )
}

export default NewItemReduct;