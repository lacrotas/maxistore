import Headers from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { fetchAllReview } from "../../../http/reviewApi";
import { useState, useEffect } from "react";
import CustomButton from "../../../customUI/customButton/CustomButton";
import ModalWindow from "./modalWindow/ModalWindow";
import "./ReviewReduct.scss";

function ReviewReduct() {
    const [reviews, setReviews] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);
    const [activeReviews, setActiveReview] = useState("");

    useEffect(() => {
        fetchAllReview().then(data => {
            setReviews(data);
        })
    }, [])

    function reductReview(item) {
        setIsModalActive(true);
        setActiveReview(item)
    }

    return (
        <>
            {isModalActive && <ModalWindow setIsModalActive={setIsModalActive} reviewItem={activeReviews} />}
            <Headers isAdminHeader={true} />
            {reviews.length > 0 ?
                (
                    <div className="review_reduct">
                        {reviews.map((item, index) => (
                            <div className="review_reduct_item" key={index}>
                                <p className="tiny_p">{item.label}</p>
                                <p className="tiny_p">{item.isShowed ? "показан" : "скрыт"}</p>
                                <CustomButton dealOnClick={reductReview} value={item} text={"Редактировать"} />
                            </div>
                        ))}
                    </div>
                )
                :
                <p className="review_reduct_paragraph tiny_p">Пока у вас нет отзывов</p>
            }
            <Footer />
        </>
    )
}

export default ReviewReduct;