import CustomInput from "../../../../customUI/customInput/CustomInput";
import CustomButton from "../../../../customUI/customButton/CustomButton";
import "./AddCategory.scss";
import { updatePodKategory } from "../../../../http/KategoryApi";
import { useState } from "react";
import { LOGIN_ROUTE } from "../../../../pages/appRouter/Const";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddCategory({ value }) {
    const [itemName, setItemName] = useState(value.name);
    const history = useHistory();


    function updateItem() {
        updatePodKategory(value.id, { name: itemName, kategoryId: value.kategoryId }).then(data => {
            if (data) {
                alert("Подподкатегория успешно отредактированна");
                window.location.reload();
            } else {
                alert("Ваша сессия завершена, авторизируйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        }
        )
    }
    return (
        <div className="modal_add_category">
            <input className="custom_input tiny_p" onChange={(e) => setItemName(e.target.value)} value={itemName} type="text" placeholder={"Название подкатегории"} />
            <CustomButton dealOnClick={updateItem} text={"Применить"} />
        </div>
    )
}

export default AddCategory;