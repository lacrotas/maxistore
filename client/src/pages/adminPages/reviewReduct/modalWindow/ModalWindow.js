import "./ModalWindow.scss";
import AddReview from "./addReview/AddReview";

function ModalWindow({ setIsModalActive, reviewItem }) {
    return (
        <div className="modal">
            <div className="modal_content">
                <AddReview reviewItem={reviewItem} />
            </div>
            <div className="modal_back" onClick={() => setIsModalActive(false)}></div>
        </div >
    )
}

export default ModalWindow;