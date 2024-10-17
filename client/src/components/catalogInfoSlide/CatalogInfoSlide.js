import "./CatalogInfoSlide.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ITEM_ROUTE } from "../../pages/appRouter/Const";
import { fetchAllMainKategory, fetchAllKategoryByMainKategoryId, fetchAllKategoryByPodKategoryId } from "../../http/KategoryApi";
import { useHistory } from 'react-router-dom';

function CatalogInfoSlide({ setIsCategoryActive }) {
    const history = useHistory();
    const [activeCategory, setActiveCategory] = useState(0);
    const [mainCategory, setMainCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [podCategory, setPodCategory] = useState([]);

    useEffect(() => {
        // Получаем все основные категории
        fetchAllMainKategory().then(data => {
            setMainCategory(data);

            // Для каждой основной категории получаем подкатегории
            Promise.all(
                data.map(mainCat => fetchAllKategoryByMainKategoryId(mainCat.id))
            ).then(subCategoryData => {
                setCategory(subCategoryData);

                // Для каждой подкатегории получаем подподкатегории (podCategory)
                Promise.all(
                    subCategoryData.map((subCategories, index) =>
                        Promise.all(subCategories.map(subCat =>
                            fetchAllKategoryByPodKategoryId(subCat.id)
                        ))
                    )
                ).then(podCategoryData => {
                    setPodCategory(podCategoryData);
                });
            });
        });
    }, []);

    const handleClick = (newPath) => {
        history.push({
            pathname: ITEM_ROUTE,
            state: { path: newPath },
        });
        window.location.reload();
    };

    return (
        <div>
            <div className="catalogSlide">
                {mainCategory.length > 0 && mainCategory.map((mainCategoryItem, index) => (
                    <div className="catalogSlide_mainCategory">
                        <p onClick={() => setActiveCategory(index)} className={activeCategory === index ? "mainCategory_label small_p active" : "mainCategory_label small_p"}>{mainCategoryItem.name}</p>
                        <div className="right_block">
                            {category[index]?.length > 0 && category[index].map((categoryItem, categoryIndex) => (
                                <div className={activeCategory === index ? "right_block_category active" : "right_block_category"}>
                                    <NavLink onClick={() => handleClick([mainCategoryItem, categoryItem])} to={{ pathname: ITEM_ROUTE, state: { path: [mainCategoryItem, categoryItem] } }}>
                                        <p className="category_label small_p">{categoryItem.name}</p>
                                    </NavLink>
                                    <div className="podCategory_container tiny_p">
                                        {podCategory[index]?.[categoryIndex]?.length > 0 && podCategory[index][categoryIndex].map((podCategoryitem, categortindex) => (
                                            <NavLink onClick={() => handleClick([mainCategoryItem, categoryItem, podCategoryitem])} to={{ pathname: ITEM_ROUTE, state: { path: [mainCategoryItem, categoryItem, podCategoryitem] } }}>
                                                <p onClick={() => setIsCategoryActive(false)} className="podCategory_label">{podCategoryitem.name}</p>
                                            </NavLink>
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