import "./CustomButton.scss";

function CustomButton({ text, dealOnClick, value }) {
    return (
        <div className="custom_button" onClick={() => dealOnClick(value)}>
            <p className="custom_button_text tiny_p">{text}</p>
        </div>
    )
}

export default CustomButton;