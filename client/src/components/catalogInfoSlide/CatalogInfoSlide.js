import "./CatalogInfoSlide.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ITEM_MAIN_ROUTE } from "../../pages/appRouter/Const";
import { fetchAllMainKategory, fetchAllKategoryByMainKategoryId, fetchAllPodKategoryByKategoryId } from "../../http/KategoryApi";
import { useHistory } from 'react-router-dom';
import { FiX } from "react-icons/fi";

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
                            fetchAllPodKategoryByKategoryId(subCat.id)
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
            pathname: ITEM_MAIN_ROUTE,
            state: { path: newPath },
        });
        setIsCategoryActive(false);
    };

    return (
        <div className="catalog-modal">
            <div className="modal-overlay" onClick={() => setIsCategoryActive(false)}></div>

            <div className="modal-container">
                <button className="close-button" onClick={() => setIsCategoryActive(false)}>
                    <FiX size={24} />
                </button>

                <div className="categories-container">
                    <div className="main-categories">
                        {mainCategory.map((mainCategoryItem, index) => (
                            <div
                                key={mainCategoryItem.id}
                                className={`main-category ${activeCategory === index ? 'active' : ''}`}
                                onClick={() => setActiveCategory(index)}
                            >
                                {mainCategoryItem.name}
                            </div>
                        ))}
                    </div>

                    <div className="subcategories-container">
                        {category[activeCategory]?.map((categoryItem, categoryIndex) => {
                            const mainCategoryItem = mainCategory[activeCategory];
                            return (
                                <div key={categoryItem.id} className="subcategory-group">
                                    <NavLink
                                        className="subcategory-title"
                                        to={{
                                            pathname: `${ITEM_MAIN_ROUTE}/${mainCategoryItem.id}/${categoryItem.id}`,
                                            state: { path: [mainCategoryItem, categoryItem] }
                                        }}
                                        onClick={() => handleClick([mainCategoryItem, categoryItem])}
                                    >
                                        {categoryItem.name}
                                    </NavLink>

                                    <div className="podcategories">
                                        {podCategory[activeCategory]?.[categoryIndex]?.map(podCategoryitem => (
                                            <NavLink
                                                key={podCategoryitem.id}
                                                className="podcategory-item"
                                                to={{
                                                    pathname: `${ITEM_MAIN_ROUTE}/${mainCategoryItem.id}/${categoryItem.id}/${podCategoryitem.id}`,
                                                    state: { path: [mainCategoryItem, categoryItem, podCategoryitem] }
                                                }}
                                                onClick={() => handleClick([mainCategoryItem, categoryItem, podCategoryitem])}
                                            >
                                                {podCategoryitem.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CatalogInfoSlide;