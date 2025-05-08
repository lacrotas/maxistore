import "./Slide.scss";

export default function Slide({ image, isActive, label, description }) {
    return (
        <div className={`slider_item ${isActive ? 'current' : 'next'}`}>
            <img src={image} alt="slider" />
            <div className={`item_container ${isActive ? 'current' : ''}`}>
                <div className="container_text">
                    <h1 className="large_h Jura_bold">{label}</h1>
                    <p className="medium_p common_reg">{description}</p>
                </div>
                <button className="slider_button">Подробнее</button>
            </div>
        </div>
    )
}