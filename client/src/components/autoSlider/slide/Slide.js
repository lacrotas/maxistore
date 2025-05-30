import "./Slide.scss";

export default function Slide({ image, isActive, label, description, link }) {
    const handleClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <div className={`slider_item ${isActive ? 'current' : 'next'}`}>
            <img src={image} alt="slider" />
            <div className={`item_container ${isActive ? 'current' : ''}`}>
                <div className="container_text">
                    <h1 className="large_h Jura_bold">{label}</h1>
                    <p className="medium_p common_reg">{description}</p>
                </div>
                {link && (
                    <button 
                        className="slider_button" 
                        onClick={handleClick}
                    >
                        Подробнее
                    </button>
                )}
            </div>
        </div>
    );
}