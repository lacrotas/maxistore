import "./ModalWindow.scss";
import Search from "./content/search/Search";
import Contacts from "./content/contacts/Contacts";
import Delivery from "./content/delivery/Delivery";
import Order from "./content/order/Order";

function ModalWindow({ setIsModalActive, type }) {
    return (
        <div className="modal">
            <div className="modal_content">
                {type === "search" ?
                    <Search />
                    : type === "contacts" ?
                        <Contacts />
                        : type === "delivery" ?
                            <Delivery />
                            : type === "order" ?
                                <Order />
                                :
                                <></>
                }
            </div>
            <div className="modal_back" onClick={() => setIsModalActive(false)}></div>
        </div >
    )
}

export default ModalWindow;