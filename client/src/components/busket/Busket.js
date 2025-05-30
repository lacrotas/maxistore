// import BusketItem from "./busketItem/BusketItem";
// import "./Busket.scss";
// import CheckModal from "../../customUI/checkModal/checkModal";
// import { useState, useEffect } from "react";
// import BusketFinal from "./busketFinal/BusketFinal";
// import { fetchItemId } from "../../http/itemApi";
// import ModalWindow from "../modalWindow/ModalWindow";

// function Busket() {
//     const [finalsum, setFinalSum] = useState(0);
//     const [isActiveIndex, setIsActiveIndex] = useState();
//     const [itemCounter, setItemCounter] = useState(0);
//     const [itemsArr, setItemsArr] = useState([]);

//     const [isModalActive, setIsModalActive] = useState(false);

//     useEffect(() => {
//         if (isModalActive) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = '';
//         }
//         return () => {
//             document.body.style.overflow = '';
//         };
//     })

//     function openPromp(index) {
//         setIsActiveIndex(index);
//     }

//     function removeDuplicates(arr) {
//         return [...new Set(arr)];
//     }

//     const loadBasketItems = async () => {
//         let busket = localStorage.getItem("maxiBasket") || "false";
//         let newBusket = busket === "false" ? [] : busket.split(',');
//         const uniqueItems = removeDuplicates(newBusket.filter(id => id));

//         setItemCounter(uniqueItems.length);

//         const itemsData = await Promise.all(
//             uniqueItems.map(id => fetchItemId(id).catch(() => null)
//             ));

//         const validItems = itemsData.filter(item => item !== null);
//         setItemsArr(validItems);

//         const total = validItems.reduce((sum, item) => sum + Number(item.price), 0);
//         setFinalSum(total);
//     };

//     useEffect(() => {
//         loadBasketItems();

//         const handleStorageChange = () => {
//             loadBasketItems();
//         };

//         window.addEventListener('storage', handleStorageChange);

//         return () => {
//             window.removeEventListener('storage', handleStorageChange);
//             document.body.style.overflow = '';
//         };
//     }, []);

//     const handleRemoveItem = (index) => {
//         const itemToRemove = itemsArr[index];
//         let busket = localStorage.getItem("maxiBasket") || "false";
//         let newBusket = busket === "false" ? [] : busket.split(',');

//         const updatedBusket = newBusket.filter(id => id !== itemToRemove.id.toString());
//         localStorage.setItem('maxiBasket', updatedBusket.join(','));

//         setItemsArr(prev => prev.filter((_, i) => i !== index));
//         setFinalSum(prev => prev - Number(itemToRemove.price));
//         setItemCounter(prev => prev - 1);
//     };

//     const endings = ['товар', 'товара', 'товаров'];

//     function getWordEnding(number, words) {
//         const cases = [2, 0, 1, 1, 1, 2];
//         return words[
//             (number % 100 > 4 && number % 100 < 20)
//                 ? 2
//                 : cases[Math.min(number % 10, 5)]
//         ];
//     }

//     return (
//         <>
//             <div className="busket">
//                 <h3 className="busket_label medium_h">
//                     В корзине {itemCounter} {getWordEnding(itemCounter, endings)}
//                 </h3>
//                 {itemsArr.map((item, index) => (
//                     <BusketItem
//                         key={item.id}
//                         remoweItem={handleRemoveItem}
//                         index={index}
//                         item={item}
//                         setFinalSum={setFinalSum}
//                     />
//                 ))}
//                 <div>
//                     {isModalActive ? <ModalWindow setIsModalActive={setIsModalActive} type={"order"} /> : <></>}
//                     <div className="busketFinal">
//                         <p className="small_h">Ваш заказ</p>
//                         <p className="small_h">В корзине: {itemCounter} {getWordEnding(itemCounter, endings)}</p>
//                         <p className="small_h">Итог: {finalsum} руб</p>
//                         <button className="busketFinal_button tiny_p" onClick={() => setIsModalActive(true)}>Оформить заказ</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Busket;


import BusketItem from "./busketItem/BusketItem";
import "./Busket.scss";
import CheckModal from "../../customUI/checkModal/checkModal";
import { useState, useEffect } from "react";
import BusketFinal from "./busketFinal/BusketFinal";
import { fetchItemId } from "../../http/itemApi";
import ModalWindow from "../modalWindow/ModalWindow";

function Busket() {
    const [finalSum, setFinalSum] = useState(0);
    const [activeIndex, setActiveIndex] = useState();
    const [itemCounter, setItemCounter] = useState(0);
    const [itemsArray, setItemsArray] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);

    useEffect(() => {
        if (isModalActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalActive]);

    function openPrompt(index) {
        setActiveIndex(index);
    }

    function removeDuplicates(array) {
        return [...new Set(array)];
    }

    const loadBasketItems = async () => {
        let basket = localStorage.getItem("maxiBasket") || "false";
        let newBasket = basket === "false" ? [] : basket.split(',');
        const uniqueItems = removeDuplicates(newBasket.filter(id => id));

        setItemCounter(uniqueItems.length);

        const itemsData = await Promise.all(
            uniqueItems.map(id => fetchItemId(id).catch(() => null)
            ));

        const validItems = itemsData.filter(item => item !== null);
        setItemsArray(validItems);

        const total = validItems.reduce((sum, item) => sum + Number(item.price), 0);
        setFinalSum(total);
    };

    useEffect(() => {
        loadBasketItems();

        const handleStorageChange = () => {
            loadBasketItems();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleRemoveItem = (index) => {
        const itemToRemove = itemsArray[index];
        let busket = localStorage.getItem("maxiBasket") || "false";
        let newBusket = busket === "false" ? [] : busket.split(',');

        const updatedBusket = newBusket.filter(id => id !== itemToRemove.id.toString());
        localStorage.setItem('maxiBasket', updatedBusket.join(','));

        setItemsArray(prev => prev.filter((_, i) => i !== index));
        setFinalSum(prev => prev - Number(itemToRemove.price));
        setItemCounter(prev => prev - 1);
    };

    const wordEndings = ['товар', 'товара', 'товаров'];

    function getWordEnding(number, words) {
        const cases = [2, 0, 1, 1, 1, 2];
        return words[
            (number % 100 > 4 && number % 100 < 20)
                ? 2
                : cases[Math.min(number % 10, 5)]
        ];
    }

    return (
        <div className="busket-page-container">
            <div className="busket-main-content">
                <div className="busket-items-section">
                    <h2 className="busket-title">
                        В корзине {itemCounter} {getWordEnding(itemCounter, wordEndings)}
                    </h2>
                    <div className="busket-items-grid">
                        {itemsArray.map((item, index) => (
                            <BusketItem
                                key={item.id}
                                removeItem={handleRemoveItem}
                                index={index}
                                item={item}
                                setFinalSum={setFinalSum}
                            />
                        ))}
                    </div>
                </div>

                <div className="busket-summary-section">
                    <div className="busket-summary-card">
                        <h3 className="summary-title">Ваш заказ</h3>
                        <div className="summary-details">
                            <p className="summary-text">
                                В корзине: {itemCounter} {getWordEnding(itemCounter, wordEndings)}
                            </p>
                            <p className="summary-text">
                                Итоговая сумма: {finalSum} руб
                            </p>
                        </div>
                        <button
                            className="checkout-button"
                            onClick={() => setIsModalActive(true)}
                            disabled={itemCounter === 0}
                        >
                            Оформить заказ
                        </button>
                    </div>
                </div>
            </div>

            {isModalActive && (
                <ModalWindow
                    setIsModalActive={setIsModalActive}
                    type={"order"}
                />
            )}
        </div>
    );
}

export default Busket;