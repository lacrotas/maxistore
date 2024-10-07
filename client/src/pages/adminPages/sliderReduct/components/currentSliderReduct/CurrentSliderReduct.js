import "./CurrentSliderReduct.scss";
import UpdateImage from "../../../../../assets/images/UpdateImage.png";
import { useState } from "react";
import CustomButton from "../../../../../customUI/customButton/CustomButton";
import { useLocation } from 'react-router-dom';
import { postSlider, updateOneSlider, deleteOneSlider } from "../../../../../http/SliderApi";

function CurrentSliderReduct() {
    const location = useLocation();
    const { label, image, description, link, id } = location.state || {};


    const [newLabel, setLabel] = useState(label || "");
    const [newImage, setImage] = useState(image || UpdateImage);
    const [newDescription, setDescription] = useState(description || "");
    const [newLink, setLink] = useState(link || "");
    const [imageFile, setImageFile] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    function addNewSlider() {
        const formData = new FormData();
        formData.append('label', newLabel);
        formData.append('description', newDescription);
        formData.append('link', newLink);
        formData.append('image', imageFile);
        if (id) {
            updateOneSlider(id, formData);
            alert("Сообщество успешно отредактированно");
            window.location.reload();
        } else {
            postSlider(formData);
            alert("Слайдер успешно добавлен");
            window.location.reload();
        }
    }
    function deleteSlider() {
        deleteOneSlider(id);
        alert("Слайдер успешно удален");
    }

    return (
        <>
            <div className="current_slider_reduct">
                <div className="current_slider_reduct-file">
                    <input type="file" id="fileInput" className="file-input" onChange={handleImageChange} style={{ display: 'none' }} />
                    <img className="file_image" src={newImage} alt="updateImage" onClick={() => document.getElementById('fileInput').click()} style={{ cursor: 'pointer' }} />
                </div>
                <div className="current_slider_reduct--container">
                    <input className="current_slider_reduct--input medium_p" value={newLabel} onChange={(e) => setLabel(e.target.value)} type="text" placeholder="Введите заголовок" />
                    <input className="current_slider_reduct--input medium_p" value={newDescription} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Введите подзаголовок" />
                    <input className="current_slider_reduct--input medium_p" value={newLink} onChange={(e) => setLink(e.target.value)} type="text" placeholder="Введите ссылку" />
                </div>
            </div>
            <div className="current_slider_button--container">
                {id ?
                    <CustomButton text={"Удалить слайд"} dealOnClick={() => deleteSlider()} />
                    :
                    <></>}
                <CustomButton dealOnClick={() => addNewSlider()} text={"Применить"} />
            </div>
            <div className="slide">
                <img className="slide_image" src={newImage} alt="slide" />
                <div className="item_container">
                    <div className="container_text">
                        <h1 className="item_label large_h">{newLabel}</h1>
                        <p className="item_description medium_p">{newDescription}</p>
                    </div>
                    <button className="slider_button button">Подробнее</button>
                </div>
            </div>
        </>
    )
}

export default CurrentSliderReduct;