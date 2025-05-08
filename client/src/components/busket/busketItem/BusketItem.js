// import { useState } from "react";
// import "./BusketItem.scss";
// import CrossImage from "../../../assets/images/cross.png";

// function BusketItem({ setIsModalactive, item, setFinalSum, index }) {
//     const [counter, setCounter] = useState(1);
//     const [price, setPrice] = useState(item.price);

//     function changeCounter(type) {
//         setCounter((prevCounter) => {
//             if (type === "minus" && prevCounter === 0) {
//                 return prevCounter;
//             }

//             const newCounter = type === "minus" ? prevCounter - 1 : prevCounter + 1;
//             setPrice(item.price * newCounter);
//             setFinalSum(item.price * newCounter);
//             return newCounter;
//         });
//     }



//     return (
//         <div className="busketItem">
//             <img src={process.env.REACT_APP_API_URL + item.image} className="busket_image" alt="busket" />
//             <p className="tiny_p">{item.name}</p>
//             <div className="busket_container">
//                 <div className="busket_counter">
//                     <button className="counter_button" onClick={() => changeCounter("minus")}>-</button>
//                     <p className="counter_paragraph tiny_p">{counter}</p>
//                     <button className="counter_button" onClick={() => changeCounter("plus")}>+</button>
//                 </div>
//                 <p className="container_status">есть в наличии</p>
//             </div>
//             <p className="busketItem_price tiny_p">Цена: {price} руб</p>
//             <img className="busket_cross" src={CrossImage} alt="cross" onClick={() => setIsModalactive(index)} />
//         </div>
//     );
// }

// export default BusketItem;

import { useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import "./BusketItem.scss";

function BusketItem({ setIsModalactive, item, setFinalSum, index }) {
    const [counter, setCounter] = useState(1);
    const [price, setPrice] = useState(item.price);

    function changeCounter(type) {
        setCounter(prevCounter => {
            if (type === "minus" && prevCounter <= 1) return prevCounter;
            
            const newCounter = type === "minus" ? prevCounter - 1 : prevCounter + 1;
            const newPrice = item.price * newCounter;
            setPrice(newPrice);
            setFinalSum(newPrice - price);
            return newCounter;
        });
    }

    return (
        <div className="cart-item">
            <div className="item-image-container">
                <img 
                    src={process.env.REACT_APP_API_URL + item.image} 
                    className="item-image" 
                    alt={item.name} 
                />
            </div>
            
            <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-status">
                    <span className="status-dot"></span>
                    есть в наличии
                </p>
                
                <div className="item-controls">
                    <div className="quantity-selector">
                        <button 
                            className="quantity-btn minus" 
                            onClick={() => changeCounter("minus")}
                            disabled={counter <= 1}
                        >
                            <FaMinus size={12} />
                        </button>
                        <span className="quantity-value">{counter}</span>
                        <button 
                            className="quantity-btn plus" 
                            onClick={() => changeCounter("plus")}
                        >
                            <FaPlus size={12} />
                        </button>
                    </div>
                    
                    <div className="price-container">
                        <span className="price-label">Сумма:</span>
                        <span className="price-value">{price} руб</span>
                    </div>
                </div>
            </div>
            
            <button 
                className="remove-btn" 
                onClick={() => setIsModalactive(index)}
                aria-label="Удалить товар"
            >
                <FaTimes size={16} />
            </button>
        </div>
    );
}

export default BusketItem;