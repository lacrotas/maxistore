import Headers from "../../../components/header/Header";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import "./ItemPageMainKategory.scss";
import { fetchAllKategoryByMainKategoryId } from "../../../http/KategoryApi";
import Footer from "../../../components/footer/Footer";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { ITEM_ROUTE } from "../../appRouter/Const";
import { useLocation } from 'react-router-dom';

function ItemPageMainKategory() {
    const mainKategoryId = useParams();
    const [currentKategory, setCurrentKategory] = useState([]);
    const location = useLocation();
    const path = location.state?.path;

    useEffect(() => {
        fetchAllKategoryByMainKategoryId(Number(mainKategoryId.id)).then(data => {
            setCurrentKategory(data || []);
        })
    }, []);

    return (
        <div className="itemPageMainKategory">
            <Headers />
            <p className="itemPageMainKategory_paragraph super_large_p">Выберите нужную вам катерогию:</p>
            <div className="itemPageMainKategory_grid">
                {currentKategory.map((item, index) => (
                    <NavLink to={{ pathname: ITEM_ROUTE, state: { path: [{ id: mainKategoryId.id, name: path.name }, { id: item.id, name: item.name }] } }}>
                        <div className="kategoryPreview" key={index} >
                            <img className="kategoryPreview_image" src={process.env.REACT_APP_API_URL + item.image} alt="image" />
                            <p className="kategoryPreview_paragraph jura_semi-medium_p">{item.name}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
            <Footer />
        </div >
    );
}

export default ItemPageMainKategory;