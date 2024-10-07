import Headers from "../../components/header/Header";
import HistoryCatalog from "../../components/historyCatalog/HistoryCatalog";
import Busket from "../../components/busket/Busket";
import Footer from "../../components/footer/Footer";

function BasketPage() {
    return (
        <div className="basket">
            <Headers />
            <HistoryCatalog path={[{ name: "Главная" }, { name: "Корзина" }]} />
            <Busket />
            <Footer />
        </div>
    )
}

export default BasketPage