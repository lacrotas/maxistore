import "./CatalogInfoSlide.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ITEM_ROUTE } from "../../pages/appRouter/Const";

function CatalogInfoSlide({ setIsCategoryActive }) {
    const [activeCategory, setActiveCategory] = useState(0);
    const mainCategory = ["Массаж", "Тренажеры", "Детские игровые комплексы"];
    const category = [
        ["Массажные кресла", "Кресла", "Аксессуары"],
        ["Тренажер кресла", "Тренажеры", "Аксессуары"],
        ["Игровые кресла", "Аксессуары"],
    ];
    const podCategory = [
        [
            ["2-х секционные столы (с вырезом)", "3-х секционные столы (с вырезом)", "Анатомические кушетки"],
            ["Ортопедические кресла", "Вибромассажные кресла"],
            ["Подушки", "Чехлы"],
        ],
        [
            ["wdq кресла", "fe что-то", "qwqw"],
            ["вцц qwdwq", "asd", "as"],
            ["уаауasfла", "qw"],
        ],
        [
            ["пзд 12", "ещddё чтоqw-то", "лasя"],
            ["aa 12e", "йййй", "вцй34343цвй"],
            ["уааdwq2ула", "йцпке12р"],
        ],
    ];
    return (
        <div>
            <div className="catalogSlide">
                {mainCategory.map((mainCategoryItem, index) => (
                    <div className="catalogSlide_mainCategory">
                        <p onClick={() => setActiveCategory(index)} className={activeCategory === index ? "mainCategory_label small_p active" : "mainCategory_label small_p"}>{mainCategoryItem}</p>
                        <div className="right_block">
                            {category[index].map((categoryItem, categoryIndex) => (
                                <div className={activeCategory === index ? "right_block_category active" : "right_block_category"}>
                                    <p className="category_label small_p">{categoryItem}</p>
                                    <div className="podCategory_container tiny_p">
                                        {podCategory[index][categoryIndex].map((item, categortindex) => (
                                            <NavLink to={{ pathname: ITEM_ROUTE, state: { path: [mainCategoryItem, categoryItem, item] } }}><p onClick={() => setIsCategoryActive(false)} className="podCategory_label">{item}</p></NavLink>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="catalogSlide_close" onClick={() => setIsCategoryActive(false)}></div>
        </div>
    )
}

export default CatalogInfoSlide;