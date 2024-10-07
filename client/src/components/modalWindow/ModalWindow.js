import "./ModalWindow.scss";
import Search from "./content/search/Search";
import Contacts from "./content/contacts/Contacts";
import Delivery from "./content/delivery/Delivery";
import Order from "./content/order/Order";
import AddCategory from "./content/addCategory/AddCategory";
import AddAttributeValue from "./content/addAttributevalue/AddAttributeValue";
import ReductImage from "./content/reductImage/ReductImage";
import AddReview from "./content/addReview/AddReview";

function ModalWindow({ setIsModalActive, type, value, addImageToArray }) {
    return (
        <div className="modal">
            <div className="modal_content">
                {type === "search" ?
                    <Search />
                    : type === "contacts" ?
                        <Contacts closeModal={setIsModalActive} />
                        : type === "delivery" ?
                            <Delivery />
                            : type === "order" ?
                                <Order />
                                : type === "addCategory" ?
                                    <AddCategory value={value} />
                                    : type === "addAttributeValue" ?
                                        <AddAttributeValue value={value} />
                                        : type === "reductImage" ?
                                            <ReductImage value={value} addImageToArray={addImageToArray} setIsModalActive={setIsModalActive} />
                                            : type === "reviewAdd" ?
                                                <AddReview itemId={value} />
                                                :
                                                <></>
                }
            </div>
            <div className="modal_back" onClick={() => setIsModalActive(false)}></div>
        </div >
    )
}

export default ModalWindow;