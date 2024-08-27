import "./BusketFinal.scss";
import ModalWindow from "../../modalWindow/ModalWindow";
import { useState, useEffect } from "react";

function BusketFinal({ finalsum }) {
    const [isModalActive, setIsModalActive] = useState(false);

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
            {isModalActive ? <ModalWindow setIsModalActive={setIsModalActive} type={"order"} /> : <></>}
            <div className="busketFinal">
                <p className="small_h">Итоговая стоимость: {finalsum} руб</p>
                <button className="busketFinal_button tiny_p" onClick={() => setIsModalActive(true)}>Оформить заказ</button>
            </div>
        </>
    );
}

export default BusketFinal;