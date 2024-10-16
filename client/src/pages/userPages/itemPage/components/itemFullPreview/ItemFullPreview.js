import Headers from "../../../../../components/header/Header";
import Footer from "../../../../../components/footer/Footer";
import "./ItemFullPreview.scss";
import { useState, useEffect } from "react";
import { fetchItemId } from "../../../../../http/itemApi";
import { fetchAllItemImageByItemId } from "../../../../../http/itemImageApi";
import { fetchAllAttributeValuesByItemId } from "../../../../../http/itemAttributeApi";
import { fetchAttributeValuesById } from "../../../../../http/attributeValue";
import { fetchAttributeById } from "../../../../../http/filterApi";
import { fetchReviewByItemIdAndIsShowed } from "../../../../../http/reviewApi";
import CustomButton from "../../../../../customUI/customButton/CustomButton";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Rating from "../../../../../components/rating/Rating";
import ItemReviews from "./itemReviews/ItemReviews";
import CustomAlert from "../../../../../components/customAlert/CustomAlert";

function ItemFullPreview() {
    const { id } = useParams();
    let isMounted = true;

    const [isAlertActive, setIsAlertActive] = useState(false);

    const [imageLenght, setImageLenght] = useState([]);
    const [currentMainImage, setCurrentMainImage] = useState("");
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
    const [selectedItemImage, setSelectedItemImage] = useState(0);

    const [item, setItem] = useState("");

    // get all characteristics
    const [itemAttributeArr, setItemAttributeArr] = useState([]);
    const [itemAttribute, setItemAttribute] = useState([]);
    const [itemAttributeValue, setItemAttributeValue] = useState([]);

    // get reviews
    const [itemReviews, setItemReviews] = useState([]);


    useEffect(() => {
        if (isMounted) {
            fetchItemId(id).then(data => {
                setItem(data);
                setCurrentMainImage(data.image);
                const newElement = data.image;
                setImageLenght(prevState => [...prevState, newElement]);
                fetchAllItemImageByItemId(data.id).then(imageData => {
                    imageData.map((item) => {
                        const newElement = item.image;
                        setImageLenght(prevState => [...prevState, newElement]);
                    })
                })
                fetchAllAttributeValuesByItemId(data.id).then(data => {
                    setItemAttributeArr(data);

                    if (Array.isArray(data)) {
                        data.forEach((item) => {
                            fetchAttributeValuesById(item.valueId).then(data => {
                                const newElement = data;
                                console.log(data);
                                setItemAttributeValue(prevState => [...prevState, newElement]);
                            });
                        })
                    } else {
                        console.error('fetchAllAttributeValuesByItemId did not return an array:', data);
                    }
                    if (Array.isArray(data)) {
                        data.forEach((item) => {
                            fetchAttributeById(item.attributeId).then(data => {
                                const newElement = data;
                                setItemAttribute(prevState => [...prevState, newElement]);
                            });
                        })
                    } else {
                        console.error('fetchAllAttributeValuesByItemId did not return an array:', data);
                    }
                }).catch(error => console.error('Error fetching all attribute values:', error));

            })
            fetchReviewByItemIdAndIsShowed(id).then(data => setItemReviews(data))
            isMounted = false;
        }
    }, []);

    const endings = ['отзыв', 'отзыва', 'отзывов'];

    function addToBusket() {
        let busket = localStorage.getItem("maxiBusket") || "false";
        let newBusket = busket == "false" ? [] : busket.split(',');
        newBusket.push(id);
        localStorage.setItem('maxiBusket', newBusket);
        setIsAlertActive(true);
    }
    function getWordEnding(number, words) {
        const cases = [2, 0, 1, 1, 1, 2];
        return words[
            (number % 100 > 4 && number % 100 < 20)
                ? 2
                : cases[Math.min(number % 10, 5)]
        ];
    }

    return (
        <>
            {isAlertActive && <CustomAlert setIsModalActive={setIsAlertActive} text={"Товар успешно добавлен в корзину"} />}
            <Headers />
            <div className="newItem">
                <div className="newItem_header">
                    <h2 className="small_h">{item.name}</h2>
                    <div className="newItem_header_container">
                        <div className="container_rating">
                            <Rating rating={Number(item.rating)} />
                            <p className="rating_paragraph tiny_p">{item.reviewNumber + " " + `${getWordEnding(item.reviewNumber, endings)}`}</p>
                            {item.isExist ? <p className="rating_paragraph-exist tiny_p">В наличии</p> : <p className="rating_paragraph-unexist tiny_p">нет в наличии</p>}
                        </div>
                        <CustomButton dealOnClick={addToBusket} text={"Добавить в корзину"} />
                    </div>
                </div>
                <div className="newItem_container">
                    <div className="container_image">
                        <div className="image_container--left">
                            {imageLenght.map((item, index) => (
                                <img key={index} className={`image_image--main ${selectedItemImage == index ? "active" : ""}`} onClick={() => setSelectedItemImage(index)} src={process.env.REACT_APP_API_URL + item} alt="empty" />
                            ))}
                        </div>
                        <div className="current_slider_reduct-file">
                            <img className="file_image" src={process.env.REACT_APP_API_URL + imageLenght[selectedItemImage]} alt="updateImage" />
                        </div>
                    </div>
                    <div className="container_description_attribute">
                        <div className="container_header">
                            <p className={`description_paragraph jura_medium_bold ${isDescriptionOpen ? "active" : null}`} onClick={() => setIsDescriptionOpen(true)}>Описание товара</p>
                            <p className={`description_paragraph jura_medium_bold ${!isDescriptionOpen ? "active" : null}`} onClick={() => setIsDescriptionOpen(false)}>Характеристики</p>
                        </div>
                        <div className={`container_description ${!isDescriptionOpen ? "active" : null}`}>
                            <p className="attribute_paragraph small_p">{item.description}</p>
                        </div>
                        <div className={`container_attribute ${isDescriptionOpen ? "active" : null}`}>
                            <div className="attribute_column attribute_column-left">
                                {itemAttribute.map((item, index) => (
                                    item !== null ? <p className="description_p" key={index}>{item.name}</p> : <></>

                                ))}
                            </div>
                            <div className="description_column description_column-right">
                                {itemAttributeValue.map((item, index) => (
                                    item !== null ? <p className="description_p" key={index}>{item.name}</p> : <></>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ItemReviews itemId={id} reviewNumber={"1"} />
            <Footer />
        </>
    )
}

export default ItemFullPreview;