import { useState } from "react";
import "./BusketItem.scss";
import CrossImage from "../../../assets/images/cross.png";

function BusketItem({ setIsModalactive, item, setFinalSum, index }) {
    const [counter, setCounter] = useState(1);
    const [price, setPrice] = useState(item.price);

    function changeCounter(type) {
        if (type === "minus") {
            if (counter === 0) {
                return
            } else {
                setCounter(counter - 1);
                setPrice(item.price * (counter - 1));
            }
        }
        if (type === "plus") {
            setCounter(counter + 1);
            setPrice(item.price * (counter + 1));
        }
        setFinalSum(item.price * (counter))
    }
    return (
        <div className="busketItem">
            <img src={process.env.REACT_APP_API_URL + item.image} className="busket_image" alt="busket" />
            <p className="tiny_p">{item.name}</p>
            <div className="busket_container">
                <div className="busket_counter">
                    <button className="counter_button" onClick={() => changeCounter("minus")}>-</button>
                    <p className="counter_paragraph tiny_p">{counter}</p>
                    <button className="counter_button" onClick={() => changeCounter("plus")}>+</button>
                </div>
                <p className="container_status">есть в наличии</p>
            </div>
            <p className="busketItem_price tiny_p">Цена: {price} руб</p>
            <img className="busket_cross" src={CrossImage} alt="cross" onClick={() => setIsModalactive(index)} />
        </div>
    );
}

export default BusketItem;