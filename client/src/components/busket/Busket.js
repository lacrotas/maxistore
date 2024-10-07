import BusketItem from "./busketItem/BusketItem";
import "./Busket.scss";
import CheckModal from "../../customUI/checkModal/checkModal";
import { useState, useEffect } from "react";
import BusketFinal from "./busketFinal/BusketFinal";
import { fetchItemId } from "../../http/itemApi"

function Busket() {
    const [finalsum, setFinalSum] = useState(1400);
    const [isModalActive, setIsModalactive] = useState(false);
    const [itemCounter, setItemCounter] = useState("0");

    const [itemsIdArr, setItemsIdArr] = useState(setBusketItems);
    const [itemsArr, setItemsArr] = useState([]);

    function setBusketItems() {
        let busket = localStorage.getItem("maxiBusket") || "false";
        let newBusket = busket == "false" ? [] : busket.split(',');
        const itemsArr = removeDuplicates(newBusket);
        setItemCounter(itemsArr.length || 0);
        // itemsIdArr.map((item) => {
        //     fetchItemId(item).then(data => {
        //         const newElement = data;
        //         setItemsArr(prevState => [...prevState, newElement]);
        //     })
        // })
        return itemsArr;
    }

    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }
    function initItemsArr() {
        itemsIdArr.map((item) => {
            fetchItemId(item).then(data => {
                const newElement = data;
                setItemsArr(prevState => [...prevState, newElement]);
            })
        })
    }
    useEffect(() => {
        if (isModalActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        // Возвращаем функцию, которая будет выполняться при размонтировании компонента
        return () => {
            document.body.style.overflow = '';
        };
    })

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
            {isModalActive ? <CheckModal text={"Вы уверены что хотите удалить этот товар?"} setIsCheck={setIsModalactive} /> : <></>}
            <div className="busket">
                <h3 className="busket_label medium_h">В корзине {itemCounter} {`${getWordEnding(itemCounter, endings)}`}</h3>
                {itemsArr.length > 0 &&
                    itemsArr.map((item, index) => {
                        <p>{item.name}</p>
                    })
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