import "./CustomInput.scss";

function CustomInput({ playceholder }) {
    return (
        <input className="custom_input tiny_p" type="text" placeholder={playceholder} />
    )
}

export default CustomInput;