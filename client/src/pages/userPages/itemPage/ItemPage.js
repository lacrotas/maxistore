import HistoryCatalog from "../../../components/historyCatalog/HistoryCatalog";
import Headers from "../../../components/header/Header";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import PlusImage from "../../../assets/images/plus.png";
import "./ItemPage.scss";
import ItemFilter from "./components/itemFilter/ItemFilter";
import { fetchAllAttributeByKategoryId, fetchAllAttributeByPodKategoryId } from "../../../http/filterApi";
import ItemGrid from "./components/itemGrid/ItemGrid";
import Footer from "../../../components/footer/Footer";
import PriceItem from "../../../components/priceItem/PriceItem";

function ItemPage() {
    const location = useLocation();
    const path = location.state?.path;
    const [filter, setFilter] = useState([]);
    const [kategryId, setKategoryId] = useState(false);
    const [podKategryId, setPodKategryId] = useState(false);

    const [itemPrice, setItemPrice] = useState({ min: 0, max: 5000 });
    const [currentFilter, setCurrentFilter] = useState([]);

    useEffect(() => {
        if ((path.length - 1) === 2) {
            setPodKategryId(path[path.length - 1].id);
            fetchAllAttributeByKategoryId(path[path.length - 2].id).then(dataKategory => {
                setFilter(dataKategory);
                fetchAllAttributeByPodKategoryId(path[path.length - 1].id).then(data => {
                    if (data.length > 0) {
                        data.map(item => {
                            const newElement = item;
                            setFilter(prevState => [...prevState, newElement]);
                        })
                    }
                })
            })
        } else {
            setKategoryId(path[path.length - 1].id);
            fetchAllAttributeByKategoryId(path[path.length - 1].id).then(data => {
                setFilter(data);
            })
        }
    }, []);

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
    function applyFilters() {
        console.log(currentFilter);
    }
    return (
        <div className="itemPage">
            <Headers />
            <HistoryCatalog path={path} />
            <div className="itemPage_fiter_grid_container">
                <div className="itemPage_filter_container">
                    <PriceItem setItemPrice={setItemPrice} />
                    {filter.map((item, index) => (
                        <ItemFilter setNewCurrentFilter={setNewCurrentFilter} item={item} key={index} />
                    ))}
                </div>
                {kategryId || podKategryId ?
                    <ItemGrid kategryId={kategryId} itemPrice={itemPrice} currentFilter={currentFilter} podKategryId={podKategryId} />
                    : <></>
                }
            </div>
            <Footer />
        </div>
    );
}

export default ItemPage;