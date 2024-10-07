import "./HistoryCatalog.scss";

function HistoryCatalog({ path }) {
    return (
        <>
            <div className="history_catalog">
                <p className="tiny_p">
                    {path.map((item, index) => (
                        index === path.length - 1 ? item.name : item.name + " › "
                    ))}
                </p>
            </div>
            <h2 className="history_label super_large_p">{path[path.length - 1].name}</h2>
        </>

    )
}

export default HistoryCatalog;