import CustomButton from "../../../../../customUI/customButton/CustomButton";
import "./AddReview.scss";
import { useState } from "react";
import InteractiveRating from "../../../../../components/InteractiveRating/InteractiveRating";
import { deleteReviewById, updateOneReview } from "../../../../../http/reviewApi";
import { LOGIN_ROUTE } from "../../../../appRouter/Const";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddReview({ reviewItem }) {
    const [itemLabel, setItemLabel] = useState(reviewItem.label);
    const [itemDescription, setItemDescription] = useState(reviewItem.description);
    const [itemRating, setItemRating] = useState(reviewItem.mark - 1);

    const history = useHistory();


    function updateNewReview() {
        updateOneReview(reviewItem.id, { label: itemLabel, description: itemDescription, mark: String(itemRating + 1), isShowed: true }).then((data) => {
            if (data) {
                alert("Отзыв успешно добавлен");
                window.location.reload();
            } else {
                alert("Ваша ссесия завершена, авторизуйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        })
    }

    function deleteReview() {
        deleteReviewById(reviewItem.id).then((data) => {
            if (data) {
                alert("Отзыв успешно удален");
                window.location.reload();
            } else {
                alert("Ваша ссесия завершена, авторизуйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        })
    }
    return (
        <div className="modal_add_review">
            <input className="custom_input tiny_p" onChange={(e) => setItemLabel(e.target.value)} value={itemLabel} type="text" placeholder={"Введите заголовок отзыва"} />
            <textarea className="custom_input review_textarea tiny_p" onChange={(e) => setItemDescription(e.target.value)} value={itemDescription} type="text" placeholder={"Введите описание отзыва"} />
            <div className="add_review_container">
                <div className="add_review">
                    <p className="add_review_paragraph tiny_p">Поставьте рейтинг товару:</p>
                    <InteractiveRating initialRating={itemRating} setItemRating={setItemRating} />
                </div>
                <CustomButton dealOnClick={deleteReview} text={"Удалить"} />
                <CustomButton dealOnClick={updateNewReview} text={"Применить"} />
            </div>
        </div>
    )
}

export default AddReview;