import "./HistoryCatalog.scss";

function HistoryCatalog({ path }) {
    return (
        <div className="history_catalog">
            <p className="tiny_p">
                {path.map((item, index) => (
                   index === path.length - 1 ? item : item + " › "
                ))}
            </p>
        </div>
    )
}

export default HistoryCatalog;