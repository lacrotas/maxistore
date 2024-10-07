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
function ItemPage() {
    const location = useLocation();
    const path = location.state?.path;
    const [filter, setFilter] = useState([]);
    const [kategryId, setKategoryId] = useState(false);
    const [podKategryId, setPodKategryId] = useState(false);

    useEffect(() => {
        if ((path.length - 1) === 2) {
            setPodKategryId(path[path.length - 1].id);
            fetchAllAttributeByPodKategoryId(path[path.length - 1].id).then(data => {
                setFilter(data);
            })
        } else {
            setKategoryId(path[path.length - 1].id);
            fetchAllAttributeByKategoryId(path[path.length - 1].id).then(data => {
                setFilter(data);
            })
        }
    }, []);
    return (
        <div className="itemPage">
            <Headers />
            <HistoryCatalog path={path} />
            <div className="itemPage_fiter_grid_container">
                <div className="itemPage_filter_container">
                    {filter.map((item, index) => (
                        <ItemFilter item={item} key={index} />
                    ))}
                    <div className="custom_button">
                        <p className="custom_button_text tiny_p"> Применить</p >
                    </div >
                </div>
                {kategryId || podKategryId ?
                    <ItemGrid kategryId={kategryId} podKategryId={podKategryId} />
                    : <></>
                }
            </div>
            <Footer />
        </div>
    );
}

export default ItemPage;