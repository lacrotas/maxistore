import Headers from "../../../components/header/Header";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import "./ItemPageMainKategory.scss";
import { fetchAllItemByMainKategoryId, fetchAllItemByPodKategoryId } from "../../../http/itemApi";
import { fetchAllKategoryByMainKategoryId, fetchMainKategoryById, fetchAllPodKategoryByKategoryId, fetchKategoryById, fetchPodKategoryById } from "../../../http/KategoryApi";
import { fetchAllAttributeByKategoryId, fetchAllAttributeByPodKategoryId } from "../../../http/filterApi";
import Footer from "../../../components/footer/Footer";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { ITEM_MAIN_ROUTE } from "../../appRouter/Const";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import GridItemPreview from "../itemPage/components/itemGrid/gridItemPrewiev/GridItemPrewiev";
import PriceItem from "../itemPage/components/itemFilter/priceItem/PriceItem";
import ItemFilter from "../itemPage/components/itemFilter/ItemFilter";

function ItemPageMainKategory() {
    const { maincategory, category, subcategory } = useParams();
    const [currentKategory, setCurrentKategory] = useState([]);
    const [currentPodKategory, setPodCurrentKategory] = useState([]);
    const [itemPage, setItemPage] = useState([]);
    const [filter, setFilter] = useState([]);
    const [itemPrice, setItemPrice] = useState({ min: 0, max: 5000 });
    const [currentFilter, setCurrentFilter] = useState([]);
    // for path
    const [mainKategoryName, setMainKategoryName] = useState({});
    const [kategoryName, setKategoryName] = useState({});
    const [podKategoryName, setPodKategoryName] = useState({});

    // Изменено: Вынесено в отдельную функцию для лучшей читаемости
    const getBreadcrumbsItems = () => {
        const items = [
            { title: "Главная", path: "/" },
            { title: mainKategoryName.name || "", path: "/itemMain/" + maincategory }
        ];

        if (category) {
            items.push({ 
                title: kategoryName.name || "", 
                path: "/itemMain/" + maincategory + "/" + category 
            });
        }

        if (subcategory) {
            items.push({ 
                title: podKategoryName.name || "", 
                path: "/itemMain/" + maincategory + "/" + category + "/" + subcategory 
            });
        }

        return items;
    };

    useEffect(() => {
        // Сброс состояний при изменении параметров
        setCurrentKategory([]);
        setPodCurrentKategory([]);
        setItemPage([]);
        setFilter([]);
        setCurrentFilter([]);
        setKategoryName({});
        setPodKategoryName({});

        if (subcategory) {
            fetchPodKategoryById(subcategory).then(data => {
                setPodKategoryName(data || {});
            });
            fetchAllAttributeByKategoryId(Number(category)).then(data => {
                setFilter(data || []);
            });
            fetchMainKategoryById(Number(maincategory)).then(data => {
                setMainKategoryName(data || {});
            });
            fetchKategoryById(Number(category)).then(data => {
                setKategoryName(data || {});
            });
            fetchAllItemByPodKategoryId(subcategory).then(data => {
                setItemPage(data || []);
            });
        }
        else if (category) {
            fetchAllAttributeByKategoryId(Number(category)).then(data => {
                setFilter(data || []);
            });
            fetchAllItemByMainKategoryId(Number(category)).then(data => {
                setItemPage(data || []);
            });
            fetchMainKategoryById(Number(maincategory)).then(data => {
                setMainKategoryName(data || {});
            });
            fetchKategoryById(Number(category)).then(data => {
                setKategoryName(data || {});
            });
            fetchAllPodKategoryByKategoryId(category).then(data => {
                setPodCurrentKategory(data || []);
            });
        } else {
            fetchAllKategoryByMainKategoryId(Number(maincategory))
                .then(async (data) => {
                    setCurrentKategory(data || []);
                    const results = await Promise.all(
                        data.map(item => fetchAllAttributeByKategoryId(item.id))
                    );
                    setFilter(results.flat().filter(Boolean) || []);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            fetchMainKategoryById(Number(maincategory)).then(data => {
                setMainKategoryName(data || {});
            });
            fetchAllItemByMainKategoryId(Number(maincategory)).then(data => {
                setItemPage(data || []);
            });
        }
    }, [maincategory, category, subcategory]);

    function setNewCurrentFilter(newFilter, isChoosen) {
        if (isChoosen) {
            const index = currentFilter.findIndex(item => {
                return Number(item.attributeId) === Number(newFilter.attributeId) && Number(item.valueId) === Number(newFilter.valueId)
            });
            if (index != -1) {
                const newFilterArray = [...currentFilter];
                newFilterArray.splice(index, 1);
                setCurrentFilter(newFilterArray);
            }
        } else {
            setCurrentFilter(prevState => [...prevState, newFilter]);
        }
    }

    return (
        <div className="itemPageMainKategory">
            <Headers />
            <Breadcrumbs items={getBreadcrumbsItems()} />
            
            {/* Основные категории - показываем только если нет category в URL */}
            {!category && currentKategory.length > 0 && (
                <div className="itemPageMainKategory_grid">
                    {currentKategory.map((item) => (
                        <NavLink 
                            to={`${ITEM_MAIN_ROUTE}/${maincategory}/${item.id}`} 
                            key={`maincat-${item.id}`}
                        >
                            <div className="kategoryPreview">
                                <p className="kategoryPreview_paragraph title_bold tiny_p">{item.name}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            )}
            
            {/* Подкатегории - показываем только если есть category, но нет subcategory */}
            {category && !subcategory && currentPodKategory.length > 0 && (
                <div className="itemPageMainKategory_grid">
                    {currentPodKategory.map((item) => (
                        <NavLink 
                            to={`${ITEM_MAIN_ROUTE}/${maincategory}/${category}/${item.id}`} 
                            key={`subcat-${item.id}`}
                        >
                            <div className="kategoryPreview">
                                <p className="kategoryPreview_paragraph title_bold tiny_p">{item.name}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            )}

            {/* filter and grid */}
            <div className="page-content-container">
                <div className="filter-section">
                    <div className="filter-header">
                        <h3>Фильтры</h3>
                    </div>

                    <PriceItem setItemPrice={setItemPrice} />

                    <div className="filter-items-container">
                        {filter.map((item, index) => (
                            <ItemFilter 
                                setNewCurrentFilter={setNewCurrentFilter} 
                                item={item} 
                                key={`filter-${index}`} 
                            />
                        ))}
                    </div>
                </div>
                <div className="item-grid">
                    {itemPage.length > 0 ? (
                        <div className="item-grid__products">
                            {itemPage.map((item) => (
                                <GridItemPreview
                                    itemPrice={itemPrice}
                                    item={item}
                                    currentFilter={currentFilter}
                                    key={`item-${item.id}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="item-grid__empty tiny_p">
                            Товаров по вашим критериям пока нет
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ItemPageMainKategory;