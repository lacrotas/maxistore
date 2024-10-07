import "./FilterValue.scss";
import EmptyCheckBox from "../../../../../../assets/images/emptyCheck.png"
import FullCheckBox from "../../../../../../assets/images/fullCheck.png"
import { useState } from "react";

function FilterValue({ item }) {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div className="description_item" onClick={() => setIsSelected(!isSelected)}>
            {isSelected ?
                <img className="item_image" src={FullCheckBox} alt="checkbox" /> :
                <img className="item_image" src={EmptyCheckBox} alt="checkbox" />
            }

            <p className="item_paragraph tiny_p">{item.name}</p>
        </div>
    )
}

export default FilterValue;