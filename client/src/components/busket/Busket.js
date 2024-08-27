import BusketItem from "./busketItem/BusketItem";
import "./Busket.scss";
import CheckModal from "../../customUI/checkModal/checkModal";
import { useState, useEffect } from "react";
import BusketFinal from "./busketFinal/BusketFinal";

function Busket() {
    const [finalsum, setFinalSum] = useState(1400);
    const [isModalActive, setIsModalactive] = useState(false);
    const item_counter = 2;
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
    }
    )
    return (
        <>
            {isModalActive ? <CheckModal text={"Вы уверены что хотите удалить этот товар?"} setIsCheck={setIsModalactive} /> : <></>}
            <div className="busket">
                <h3 className="busket_label medium_h">В корзине {item_counter} товара</h3>
                <BusketItem setIsModalactive={setIsModalactive} />
                <BusketItem setIsModalactive={setIsModalactive} />
                <BusketItem setIsModalactive={setIsModalactive} />
                <BusketFinal finalsum={finalsum} />
            </div>
        </>
    )
}

export default Busket;