// import Headers from "../../../../../components/header/Header";
// import Footer from "../../../../../components/footer/Footer";
// import "./ItemFullPreview.scss";
// import { useState, useEffect } from "react";
// import { fetchItemId } from "../../../../../http/itemApi";
// import { fetchAllItemImageByItemId } from "../../../../../http/itemImageApi";
// import { fetchAllAttributeValuesByItemId } from "../../../../../http/itemAttributeApi";
// import { fetchAttributeValuesById } from "../../../../../http/attributeValue";
// import { fetchAttributeById } from "../../../../../http/filterApi";
// import { fetchReviewByItemIdAndIsShowed } from "../../../../../http/reviewApi";
// import CustomButton from "../../../../../customUI/customButton/CustomButton";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import Rating from "../../../../../components/rating/Rating";
// import ItemReviews from "./itemReviews/ItemReviews";
// import CustomAlert from "../../../../../components/customAlert/CustomAlert";
// import OpenArrow from "../../../../../assets/images/arrow.png";
// import Arrowleft from "../../../../../assets/images/arrowRight.png";

// function ItemFullPreview() {
//     const { id } = useParams();
//     let isMounted = true;

//     const [isAlertActive, setIsAlertActive] = useState(false);

//     const [imageLenght, setImageLenght] = useState([]);
//     const [currentMainImage, setCurrentMainImage] = useState("");
//     const [selectedItemImage, setSelectedItemImage] = useState(0);

//     const [item, setItem] = useState("");

//     // get all characteristics
//     const [itemAttributeArr, setItemAttributeArr] = useState([]);
//     const [itemAttribute, setItemAttribute] = useState([]);
//     const [itemAttributeValue, setItemAttributeValue] = useState([]);

//     // get reviews
//     const [itemReviews, setItemReviews] = useState([]);


//     useEffect(() => {
//         if (isMounted) {
//             fetchItemId(id).then(data => {
//                 setItem(data);
//                 setCurrentMainImage(data.image);
//                 const newElement = data.image;
//                 setImageLenght(prevState => [...prevState, newElement]);
//                 fetchAllItemImageByItemId(data.id).then(imageData => {
//                     imageData.map((item) => {
//                         const newElement = item.image;
//                         setImageLenght(prevState => [...prevState, newElement]);
//                     })
//                 })
//                 fetchAllAttributeValuesByItemId(data.id).then(data => {
//                     setItemAttributeArr(data);

//                     if (Array.isArray(data)) {
//                         data.forEach((item) => {
//                             fetchAttributeValuesById(item.valueId).then(data => {
//                                 const newElement = data;
//                                 console.log(data);
//                                 setItemAttributeValue(prevState => [...prevState, newElement]);
//                             });
//                         })
//                     } else {
//                         console.error('fetchAllAttributeValuesByItemId did not return an array:', data);
//                     }
//                     if (Array.isArray(data)) {
//                         data.forEach((item) => {
//                             fetchAttributeById(item.attributeId).then(data => {
//                                 const newElement = data;
//                                 setItemAttribute(prevState => [...prevState, newElement]);
//                             });
//                         })
//                     } else {
//                         console.error('fetchAllAttributeValuesByItemId did not return an array:', data);
//                     }
//                 }).catch(error => console.error('Error fetching all attribute values:', error));

//             })
//             fetchReviewByItemIdAndIsShowed(id).then(data => setItemReviews(data))
//             isMounted = false;
//         }
//     }, []);

//     const endings = ['отзыв', 'отзыва', 'отзывов'];

//     function addToBusket() {
//         let busket = localStorage.getItem("maxiBusket") || "false";
//         let newBusket = busket == "false" ? [] : busket.split(',');
//         newBusket.push(id);
//         localStorage.setItem('maxiBusket', newBusket);
//         setIsAlertActive(true);
//     }
//     function getWordEnding(number, words) {
//         const cases = [2, 0, 1, 1, 1, 2];
//         return words[
//             (number % 100 > 4 && number % 100 < 20)
//                 ? 2
//                 : cases[Math.min(number % 10, 5)]
//         ];
//     }

//     // for page scrolling
//     useEffect(() => {
//         const scrollableElement = document.querySelector('.container_attribute-scrollable');

//         if (scrollableElement) {
//             function preventScrollPropagation(event) {
//                 const element = event.target;
//                 const atTop = element.scrollTop === 0;
//                 const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

//                 if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
//                     return;
//                 }

//                 event.stopPropagation();
//             }

//             scrollableElement.addEventListener('wheel', preventScrollPropagation);

//             // Удаляем обработчик при размонтировании компонента
//             return () => {
//                 scrollableElement.removeEventListener('wheel', preventScrollPropagation);
//             };
//         }
//     }, []); // Хук с пустым массивом, чтобы сработал только при монтировании

//     function setNewImageIndex(operation) {
//         if (operation === "minus") {
//             if (selectedItemImage > 0) {
//                 setSelectedItemImage(selectedItemImage - 1);
//             } else {
//                 setSelectedItemImage(imageLenght.length - 1);
//             }
//         } else {
//             if (imageLenght.length - 1 > selectedItemImage) {
//                 setSelectedItemImage(selectedItemImage + 1);
//             } else {
//                 setSelectedItemImage(0);
//             }
//         }
//     }
//     return (
//         <>
//             {isAlertActive && <CustomAlert setIsModalActive={setIsAlertActive} text={"Товар успешно добавлен в корзину"} />}
//             <Headers />
//             <div className="container_busket_small">
//                 <p className="container_busket-paragraph jura_medium_bold">{item.price} Руб.</p>
//                 <CustomButton dealOnClick={addToBusket} text={"В корзину"} />
//             </div>
//             <div className="newItem">
//                 <div className="newItem_header">
//                     <h2 className="small_h">{item.name}</h2>
//                     <div className="newItem_header_container">
//                         <div className="container_rating">
//                             <Rating rating={Number(item.rating)} />
//                             <p className="rating_paragraph tiny_p">{item.reviewNumber + " " + `${getWordEnding(item.reviewNumber, endings)}`}</p>
//                             {item.isExist ? <p className="rating_paragraph-exist tiny_p">В наличии</p> : <p className="rating_paragraph-unexist tiny_p">нет в наличии</p>}
//                         </div>
//                         <div className="container_busket">
//                             <p className="container_busket-paragraph jura_medium_bold">{item.price} Руб.</p>
//                             <CustomButton dealOnClick={addToBusket} text={"Добавить в корзину"} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="newItem_slider-small">
//                     <div className="newItem_slider-small_container">
//                         <img className="container_image_button" src={Arrowleft} alt="arrow" onClick={() => setNewImageIndex("minus")} />
//                         <div className="slider-container">
//                             <img src={process.env.REACT_APP_API_URL + imageLenght[selectedItemImage]} onClick={() => setNewImageIndex("plus")} alt={`slide-${selectedItemImage}`} />
//                         </div>
//                         <img className="container_image_button" onClick={() => setNewImageIndex("plus")} src={OpenArrow} alt="arrow" />
//                     </div>
//                     <div className="dots">
//                         {imageLenght.map((_, index) => (
//                             <span
//                                 key={index}
//                                 className={`dot ${selectedItemImage === index ? "active" : ""}`}
//                                 onClick={() => setNewImageIndex(index)}
//                             ></span>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="newItem_container">
//                     <div className="container_image">
//                         <div className="image_container--left">
//                             {imageLenght.map((item, index) => (
//                                 <img key={index} className={`image_image--main ${selectedItemImage == index ? "active" : ""}`} onClick={() => setSelectedItemImage(index)} src={process.env.REACT_APP_API_URL + item} alt="empty" />
//                             ))}
//                         </div>
//                         <img className="container_image_button" src={Arrowleft} alt="arrow" onClick={() => setNewImageIndex("minus")} />
//                         <div className="current_slider_reduct-file">
//                             <img className="file_image" src={process.env.REACT_APP_API_URL + imageLenght[selectedItemImage]} alt="updateImage" />
//                         </div>
//                         <img className="container_image_button" onClick={() => setNewImageIndex("plus")} src={OpenArrow} alt="arrow" />
//                     </div>

//                     <div className="container_description_attribute">
//                         <div className="container_header">
//                             <p className={`description_paragraph jura_medium_bold`}>О товаре</p>
//                             <a href="#description">
//                                 <div className="container_header_button">
//                                     <p className={`container_header_p tiny_p`}>Перейти к описанию</p>
//                                     <img className="container_header_image" src={OpenArrow} alt="arrow" />
//                                 </div>
//                             </a>
//                         </div>
//                         <div className={`container_attribute-scrolleble`}>
//                             <div className="attribute_column attribute_column-left">
//                                 {itemAttribute.map((item, index) => (
//                                     item !== null ? <div className="description_column_paragraph"> <p className="description_column_p tiny_p" key={index}>{item.name}</p></div> : <></>

//                                 ))}
//                             </div>
//                             <div className="attribute_column attribute_column-right">
//                                 {itemAttributeValue.map((item, index) => (
//                                     item !== null ? <div className="description_column_paragraph"> <p className="description_column_p tiny_p" key={index}>{item.name}</p></div> : <></>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="newItem_description">
//                 <p className={`medium_p jura_medium_bold`} id="description">Описание товара</p>
//                 <p className={`attribute_paragraph description_p`}>{item.description}</p>
//             </div>
//             <ItemReviews itemId={id} reviewNumber={"1"} />
//             <Footer />
//         </>
//     )
// }

// export default ItemFullPreview;

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
import ArrowIcon from "../../../../../assets/images/arrow.png";
// import HeartIcon from "../../../../../assets/images/heart.png";
// import ShareIcon from "../../../../../assets/images/share.png";

function ItemFullPreview() {
    const { id } = useParams();
    const [isAlertActive, setIsAlertActive] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [item, setItem] = useState(null);
    const [characteristics, setCharacteristics] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const itemData = await fetchItemId(id);
                if (!isMounted) return;

                setItem(itemData);

                // Load images
                const imagesResponse = await fetchAllItemImageByItemId(itemData.id);
                const allImages = [itemData.image, ...imagesResponse.map(img => img.image)];
                setImages(allImages);

                // Load characteristics
                const attributesData = await fetchAllAttributeValuesByItemId(itemData.id);
                const characteristicsData = await Promise.all(
                    attributesData.map(async attr => {
                        const [value, attribute] = await Promise.all([
                            fetchAttributeValuesById(attr.valueId),
                            fetchAttributeById(attr.attributeId)
                        ]);
                        return {
                            name: attribute.name,
                            value: value.name
                        };
                    })
                );
                setCharacteristics(characteristicsData);

                // Load reviews
                const reviewsData = await fetchReviewByItemIdAndIsShowed(id);
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("maxiBusket") || "[]");
        if (!cart.includes(id)) {
            localStorage.setItem('maxiBusket', JSON.stringify([...cart, id]));
            setIsAlertActive(true);
        }
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const selectImage = (index) => {
        setCurrentImageIndex(index);
    };

    const getReviewWord = (number) => {
        const cases = [2, 0, 1, 1, 1, 2];
        const words = ['отзыв', 'отзыва', 'отзывов'];
        return words[
            (number % 100 > 4 && number % 100 < 20)
                ? 2
                : cases[Math.min(number % 10, 5)]
        ];
    };

    if (!item) return <div className="loading">Загрузка...</div>;

    return (
        <>
            {isAlertActive && (
                <CustomAlert
                    setIsModalActive={setIsAlertActive}
                    text={"Товар добавлен в корзину"}
                    autoClose={3000}
                />
            )}

            <Headers />

            <div className="product-page">
                {/* Product header */}
                <div className="product-header">
                    <h1 className="product-title">{item.name}</h1>

                    <div className="product-meta">
                        <div className="rating-availability">
                            <div className="rating-container">
                                <Rating rating={Number(item.rating)} />
                                <span className="review-count">
                                    {item.reviewNumber} {getReviewWord(item.reviewNumber)}
                                </span>
                            </div>
                            <span className={`availability ${item.isExist ? 'in-stock' : 'out-of-stock'}`}>
                                {item.isExist ? 'В наличии' : 'Нет в наличии'}
                            </span>
                        </div>

                        <div className="product-actions">
                            <button
                                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                                onClick={toggleFavorite}
                            >
                                {/* <HeartIcon /> */}
                            </button>
                            <button className="share-btn">
                                {/* <ShareIcon /> */}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product content */}
                <div className="product-content">
                    {/* Image gallery */}
                    <div className="product-gallery">
                        <div className="thumbnail-list">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => selectImage(index)}
                                >
                                    <img
                                        src={process.env.REACT_APP_API_URL + img}
                                        alt={`Thumbnail ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="main-image-container">
                            <button className="nav-btn prev" onClick={prevImage}>
                                <img src={ArrowIcon} />
                            </button>

                            <div className="main-image">
                                <img
                                    src={process.env.REACT_APP_API_URL + images[currentImageIndex]}
                                    alt={item.name}
                                />
                            </div>

                            <button className="nav-btn next" onClick={nextImage}>
                                {/* <ArrowIcon /> */}
                            </button>
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="product-info">
                        <div className="price-section">
                            <div className="price-container">
                                <span className="current-price">{item.price} ₽</span>
                                {item.oldPrice && (
                                    <span className="old-price">{item.oldPrice} ₽</span>
                                )}
                            </div>

                            <CustomButton
                                onClick={addToCart}
                                disabled={!item.isExist}
                                className="add-to-cart-btn"
                            >
                                {item.isExist ? 'Добавить в корзину' : 'Нет в наличии'}
                            </CustomButton>
                        </div>

                        {/* Characteristics */}
                        <div className="characteristics-section">
                            <h3 className="section-title">Характеристики</h3>
                            <div className="characteristics-grid">
                                {characteristics.map((char, index) => (
                                    <div key={index} className="characteristic-row">
                                        <span className="char-name">{char.name}</span>
                                        <span className="char-value">{char.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product tabs */}
                <div className="product-tabs">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Описание
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Отзывы ({item.reviewNumber})
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'description' ? (
                            <div className="description-content">
                                <h3 className="content-title">Подробное описание</h3>
                                <div className="description-text">
                                    {item.description}
                                </div>
                            </div>
                        ) : (
                            <ItemReviews itemId={id} reviews={reviews} />
                        )}
                    </div>
                </div>

                {/* Mobile fixed cart button */}
                <div className="mobile-cart-fixed">
                    <div className="price-container">
                        <span className="current-price">{item.price} ₽</span>
                        {item.oldPrice && (
                            <span className="old-price">{item.oldPrice} ₽</span>
                        )}
                    </div>
                    <CustomButton
                        onClick={addToCart}
                        disabled={!item.isExist}
                        className="add-to-cart-btn"
                    >
                        {item.isExist ? 'В корзину' : 'Нет в наличии'}
                    </CustomButton>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ItemFullPreview;