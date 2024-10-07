import CustomButton from "../../../../../../customUI/customButton/CustomButton";
import "./CurrentKategoryReductItem.scss";

function CurrentKategoryReductItem({ item, removeItem, reductItem }) {
    return (
        <div className="current_kategory_reduct_item">
            <p className="tiny_p">{item.name}</p>
            <div className="item_container">
                <CustomButton dealOnClick={reductItem} value={item} text={"Редактировать"} />
                <CustomButton dealOnClick={removeItem} value={item.id} text={"Удалить"} />
            </div>
        </div>
    )
}

export default CurrentKategoryReductItem;