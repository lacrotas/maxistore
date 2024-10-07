import { useState, useEffect } from "react";
import ArrowImage from "../../../assets/images/arrow.png";
import ArrowOpenImage from "../../../assets/images/arrowOpen.png";
import CustomButton from "../../../customUI/customButton/CustomButton";
import Headers from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { postQwestion, deleteQwestion, fetchAllQwestion } from "../../../http/qwestionApi";
import { LOGIN_ROUTE } from "../../appRouter/Const";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./QwestionReduct.scss";

function QwestionReduct() {
    const history = useHistory();

    const [activeIndex, setActiveIndex] = useState(null);
    const [qwestionHeader, setQwestionHeader] = useState(null);
    const [qwestionDescription, setQwestionDescription] = useState(null);
    const [qwestionData, setQwestionData] = useState([]);

    useEffect(() => {
        fetchAllQwestion().then(data => setQwestionData(data));
    }, []);

    const activeToggle = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    function addQwestion() {
        postQwestion({ qwestion: qwestionHeader, description: qwestionDescription }).then(data => {
            if (data) {
                alert("Данный вопрос успешно добавлен");
                window.location.reload();
            } else {
                alert("Ваша сессия завершена, авторизируйтесь повторно");
                history.push(LOGIN_ROUTE);
            }
        })
    }
    function deleteQwestionItem(id) {
        const result = prompt("Вы уверенны что хотите удалить этот вопрос? Если уверены введите слово \"да\"", []);
        if (result) {
            deleteQwestion(id).then(data => {
                if (data) {
                    alert("Данный вопрос успешно удален");
                    window.location.reload();
                } else {
                    alert("Ваша сессия завершена, авторизируйтесь повторно");
                    history.push(LOGIN_ROUTE);
                }
            })
        }
    }

    return (
        <>
            <Headers isAdminHeader={true} />
            <div className="qwestionReduct_add_container">
                <input value={qwestionHeader} onChange={(e) => setQwestionHeader(e.target.value)} className="container_item medium_p" type="text" placeholder="Введите вопрос" />
                <textarea value={qwestionDescription} onChange={(e) => setQwestionDescription(e.target.value)} className="container_item medium_p" type="text" placeholder="Введите описание" />
                <CustomButton dealOnClick={addQwestion} text={"Добавить вопрос"} />
            </div>
            <section className="qwestion_reduct" id="qwestion">
                <ul className="qwestion_list">
                    {qwestionData.map((item, index) => (
                        <li key={index} className={`list_item ${activeIndex === index ? 'active' : 'unactive'}`} onClick={() => activeToggle(index)}>
                            <div className="qwestion_header">
                                <img className="header_image-closed" src={ArrowImage} alt="arrow" />
                                <img className="header_image-open" src={ArrowOpenImage} alt="arrow" />
                                <h3 className="header_label medium_p">{item.qwestion}</h3>
                                <CustomButton dealOnClick={deleteQwestionItem} value={item.id} text={"удалить"} />
                            </div>
                            <div className="qwestion_description">
                                <p className="description_text medium_p">{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section >
            <Footer />
        </>
    )
}

export default QwestionReduct;