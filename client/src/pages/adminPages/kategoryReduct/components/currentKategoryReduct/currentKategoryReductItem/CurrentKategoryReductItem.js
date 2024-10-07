import CustomButton from "../../../../../../customUI/customButton/CustomButton";
import "./CurrentKategoryReductItem.scss";
import { NavLink } from "react-router-dom";
import { CURRENT_POD_KATEGORY_REDUCT_ROUTE } from "../../../../../appRouter/Const";

function CurrentKategoryReductItem({ item, removeItem, reductItem }) {
    return (
        <div className="current_kategory_reduct_item">
            <p className="tiny_p">{item.name}</p>
            <div className="item_container">
                <NavLink to={{ pathname: CURRENT_POD_KATEGORY_REDUCT_ROUTE, state: { name: item.name, id: item.id, image: item.image } }} >
                    <CustomButton dealOnClick={reductItem} text={"Редактировать"} />
                </NavLink>
                <CustomButton dealOnClick={removeItem} value={item.id} text={"Удалить"} />
            </div>
        </div>
    )
}

export default CurrentKategoryReductItem;