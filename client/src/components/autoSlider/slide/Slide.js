import "./Slide.scss";

export default function Slide({ image, type, label, description }) {
    return (
        <div className={"slider_item " + type}>
            <img src={image} alt="slider_image" />
            <div className="item_container">
                <div className="container_text">
                    <h1 className="item_label large_h">{label}</h1>
                    <p className="item_description medium_p">{description}</p>
                </div>
                <button className="slider_button button">Подробнее</button>
            </div>
        </div>
    )
}