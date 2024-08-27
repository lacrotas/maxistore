import TestImage from "../../../assets/images/testForBusket.png"
import { useState } from "react";
import "./BusketItem.scss";
import CrossImage from "../../../assets/images/cross.png";

function BusketItem({setIsModalactive}) {
    const [counter, setCounter] = useState(1);
    const [price, setPrice] = useState(419);
    const item_price = 419;

    function changeCounter(type) {
        if (type === "minus") {
            if (counter === 0) {
                return
            } else {
                setCounter(counter - 1);
                setPrice(item_price * (counter - 1));
            }
        }
        if (type === "plus") {
            setCounter(counter + 1);
            setPrice(item_price * (counter + 1));
        }
    }
    return (
            <div className="busketItem">
                <img src={TestImage} className="busket_image" alt="busket" />
                <p className="tiny_p">Батут FunFit 252 см - 8ft PRO</p>
                <div className="busket_container">
                    <div className="busket_counter">
                        <button className="counter_button" onClick={() => changeCounter("minus")}>-</button>
                        <p className="counter_paragraph tiny_p">{counter}</p>
                        <button className="counter_button" onClick={() => changeCounter("plus")}>+</button>
                    </div>
                    <p className="container_status">есть в наличии</p>
                </div>
                <p className="busketItem_price tiny_p">Цена: {price} руб</p>
                <img className="busket_cross" src={CrossImage} alt="cross" onClick={() => setIsModalactive(true)} />
            </div>
    );
}

export default BusketItem;