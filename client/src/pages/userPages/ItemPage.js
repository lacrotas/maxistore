import HistoryCatalog from "../../components/historyCatalog/HistoryCatalog";
import Headers from "../../components/header/Header";
import { useLocation } from 'react-router-dom';

function ItemPage() {
    const location = useLocation();
    const path = location.state?.path;
    return (
        <div className="itemPage">
            <Headers />
            <HistoryCatalog path={path} />
        </div>
    );
}

export default ItemPage;