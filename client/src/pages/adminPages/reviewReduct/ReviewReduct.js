import Headers from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { fetchAllReview } from "../../../http/reviewApi";
import { useState, useEffect } from "react";
import CustomButton from "../../../customUI/customButton/CustomButton";
import ModalWindow from "./modalWindow/ModalWindow";
import "./ReviewReduct.scss";
import CustomLabel from "../../../customUI/customLabel/CustomLabel";

function ReviewReduct() {
    const [reviews, setReviews] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);
    const [activeReviews, setActiveReview] = useState("");

    const [isShowedReviews, setIsShowedReviews] = useState(true);
    const [isShowedReviewsNumber, setIsShowedReviewsNumber] = useState(false);
    const [unShowedReviewsNumber, setUnShowedReviewsNumber] = useState(false);

    useEffect(() => {
        fetchAllReview().then(data => {
            setReviews(data);
            data.map((item) => {
                if (item.isShowed) {
                    setIsShowedReviewsNumber(true);
                } else if (item.isShowed == false) {
                    setUnShowedReviewsNumber(true);
                }
            })
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
            <CustomLabel text={"Редактирование отзывов"} />
            {reviews.length > 0 ?
                (
                    <div className="review_reduct">
                        <div className="review_reduct_header">
                            <p className={`reduct_header_paragraph small_p ${isShowedReviews ? "active" : ""}`} onClick={() => setIsShowedReviews(true)}>Одобренные отзывы</p>
                            <p className={`reduct_header_paragraph small_p ${!isShowedReviews ? "active" : ""}`} onClick={() => setIsShowedReviews(false)}>Ожидающие одобрения отзывы</p>
                        </div>
                        <div className={`reduct_header_container ${isShowedReviews ? "active" : ""}`}>

                            {isShowedReviewsNumber ? reviews.map((item, index) => (
                                item.isShowed ?
                                    <div className="review_reduct_item" key={index}>
                                        <p className="tiny_p">{item.label}</p>
                                        <CustomButton dealOnClick={reductReview} value={item} text={"Редактировать"} />
                                    </div>
                                    : <></>
                            )) : <p className="review_reduct_paragraph tiny_p">Пока у вас нет отзывов</p>}
                        </div>
                        <div className={`reduct_header_container ${!isShowedReviews ? "active" : ""}`}>
                            {unShowedReviewsNumber ? reviews.map((item, index) => (
                                !item.isShowed ?
                                    <div className="review_reduct_item" key={index}>
                                        <p className="tiny_p">{item.description}</p>
                                        <CustomButton dealOnClick={reductReview} value={item} text={"Редактировать"} />
                                    </div>
                                    : <></>
                            )) : <p className="review_reduct_paragraph tiny_p">Пока нет отзывов требующих одобрение</p>}
                        </div>
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