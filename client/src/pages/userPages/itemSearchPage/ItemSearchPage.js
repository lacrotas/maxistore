import ItemGrid from "./itemGrid/ItemGrid";
import Headers from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { useLocation } from 'react-router-dom';

function ItemSearchPage() {
    const location = useLocation();
    const path = location.state?.path;

    return (
        <>
            <Headers />
            <ItemGrid name={path.name} />
            <Footer />
        </>
    )
}

export default ItemSearchPage;