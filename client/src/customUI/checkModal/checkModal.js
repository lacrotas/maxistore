import "./checkModal.scss";
import CustomButton from "../customButton/CustomButton";
import { useState } from "react";

function CheckModal({ text, setIsCheck }) {

    const [isOk, setIsOk] = useState(false);

    function setAnswerAndClose(value){
        setIsOk(value);
        setIsCheck(false);
    }

    return (
        <div className="check_modal">
            <div className="check_modal--container">
                <p className="check_modal--message medium_p">{text}</p>
                <div className="container_buttons">
                    <CustomButton text={"Отменить"} dealOnClick={setAnswerAndClose} value={false} />
                    <CustomButton text={"Потвердить"} dealOnClick={setAnswerAndClose} value={true} />
                </div>
            </div>
            <div className="check_modal--background" onClick={() => setIsCheck(false)}></div>
        </div>
    );
}

export default CheckModal;