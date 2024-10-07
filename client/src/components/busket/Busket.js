import BusketItem from "./busketItem/BusketItem";
import "./Busket.scss";
import CheckModal from "../../customUI/checkModal/checkModal";
import { useState, useEffect } from "react";
import BusketFinal from "./busketFinal/BusketFinal";
import { fetchItemId } from "../../http/itemApi"

function Busket() {
    const [finalsum, setFinalSum] = useState("");

    const [isModalActive, setIsModalactive] = useState(false);
    const [isActiveIndex, setIsActiveIndex] = useState();

    const [itemCounter, setItemCounter] = useState("0");
    const [itemsArr, setItemsArr] = useState([]);

    const [localBusket, setLocalBusket] = useState();

    function openPromp(index) {
        setIsActiveIndex(index);
        setIsModalactive(true);
    }
    function setBusketItems() {
        let busket = localStorage.getItem("maxiBusket") || "false";
        let newBusket = busket == "false" ? [] : busket.split(',');
        const itemsArr = removeDuplicates(newBusket);
        setLocalBusket(itemsArr);
        setItemCounter(itemsArr.length || 0);
        return itemsArr;
    }

    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    let isBuilded = true;
    useEffect(() => {
        if (isBuilded) {
            const itemsArr = setBusketItems();
            itemsArr.map((item) => {
                fetchItemId(item).then(data => {
                    const newElement = data;
                    setFinalSum(prevState => [...prevState + data.price]);
                    setItemsArr(prevState => [...prevState, newElement]);
                })
            })
            if (isModalActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            isBuilded = false;
            // Возвращаем функцию, которая будет выполняться при размонтировании компонента
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [])

    const endings = ['товар', 'товара', 'товаров'];

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
            {isModalActive ? <CheckModal isActiveIndex={isActiveIndex} localBusket={localBusket} text={"Вы уверены что хотите удалить этот товар?"} setIsCheck={setIsModalactive} /> : <></>}
            <div className="busket">
                <h3 className="busket_label medium_h">В корзине {itemCounter} {`${getWordEnding(itemCounter, endings)}`}</h3>
                {itemsArr.length > 0 &&
                    itemsArr.map((item, index) => (
                        <BusketItem key={index} setIsModalactive={openPromp} index={index} item={item} setFinalSum={setFinalSum} />
                    ))
                }
                {/* <BusketItem setIsModalactive={setIsModalactive} />
                <BusketItem setIsModalactive={setIsModalactive} />
                <BusketItem setIsModalactive={setIsModalactive} /> */}
                <BusketFinal finalsum={finalsum} />
            </div>
        </>
    )
}

export default Busket;