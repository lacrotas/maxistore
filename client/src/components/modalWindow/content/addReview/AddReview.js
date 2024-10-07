import CustomButton from "../../../../customUI/customButton/CustomButton";
import "./AddReview.scss";
import { useState } from "react";
import InteractiveRating from "../../../InteractiveRating/InteractiveRating";
import { postReview } from "../../../../http/reviewApi";
import CustomAlert from "../../../customAlert/CustomAlert";

function AddReview({ itemId }) {
    const [itemLabel, setItemLabel] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemRating, setItemRating] = useState("");

    const [isAlertActive, setIsAlertActive] = useState(false);
    const [alertText, setAlertText] = useState("");

    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');  // Добавляем 0, если число меньше 10
        const month = String(today.getMonth() + 1).padStart(2, '0');  // Месяцы начинаются с 0, поэтому добавляем 1
        const year = today.getFullYear();

        return `${day}.${month}.${year}`;
    }

    function closeArert(state) {
        setIsAlertActive(false);
        window.location.reload();
    }

    function postNewReview() {
        postReview({ label: itemLabel, description: itemDescription, Reviewdate: getCurrentDate(), mark: String(itemRating + 1), itemId: itemId, isShowed: false }).then(data => {
            if (data) {
                setIsAlertActive(true);
                setAlertText("Ваш отзыв добавлен на проверку");
            } else {
                setIsAlertActive(true);
                setAlertText("Мы пока не можем добавить ваш отзыв о товаре");
            }
        })
    }
    return (
        <>{isAlertActive ? <CustomAlert text={alertText} setIsModalActive={closeArert} /> : <></>}
            <div className="modal_add_review">
                <input className="custom_input tiny_p" onChange={(e) => setItemLabel(e.target.value)} value={itemLabel} type="text" placeholder={"Введите заголовок отзыва"} />
                <textarea className="custom_input review_textarea tiny_p" onChange={(e) => setItemDescription(e.target.value)} value={itemDescription} type="text" placeholder={"Введите описание отзыва"} />
                <div className="add_review_container">
                    <div className="add_review">
                        <p className="add_review_paragraph tiny_p">Поставьте рейтинг товару:</p>
                        <InteractiveRating setItemRating={setItemRating} />
                    </div>
                    <CustomButton dealOnClick={postNewReview} text={"Применить"} />
                </div>
            </div>
        </>
    )
}

export default AddReview;