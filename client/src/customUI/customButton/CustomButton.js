import "./CustomButton.scss";

function CustomButton({ text, dealOnClick, value }) {
    return (
        <>
            {dealOnClick ?
                <div className="custom_button" onClick={() => dealOnClick(value)}>
                    < p className="custom_button_text tiny_p" > {text}</p >
                </div > :
                <div className="custom_button">
                    <p className="custom_button_text tiny_p">{text}</p>
                </div>
            }
        </>
    )
}

export default CustomButton;