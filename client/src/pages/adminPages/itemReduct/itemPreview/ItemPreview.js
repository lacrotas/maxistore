import CustomButton from "../../../../customUI/customButton/CustomButton";
import "./ItemPreview.scss";
import { NEW_ITEM_REDUCT_ROUTE } from "../../../appRouter/Const";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ItemPreview({ item, isHidden }) {
    return (
        <>
            {isHidden ?
                <div className="item_preview">
                    <div className="item_preview_container">
                        <img className="container_image" src={process.env.REACT_APP_API_URL + item.image} alt="image" />
                        <p className="container_paragraph tiny_p">{item.name}</p>
                    </div>
                    <NavLink to={{ pathname: NEW_ITEM_REDUCT_ROUTE, state: { path: item } }} >
                        <CustomButton text={"Редактировать"} />
                    </NavLink>
                </div>
                : <></>
            }
        </>
    )
}

export default ItemPreview;