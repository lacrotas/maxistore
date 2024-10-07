import React, { useState, useEffect } from 'react';
import Slide from "./slide/Slide";
import './AutoSlider.scss';
import { fetchSliders } from "../../http/SliderApi";


const AutoSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);

    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        fetchSliders().then(data => {
            setSliders(data); // Обновляем состояние слайдера только после получения данных
            setCurrentIndex(0); // Сбрасываем индексы
            setNextIndex(1);
        });
    }, []);

    useEffect(() => {
        if (sliders.length > 0) { // Проверяем, что слайды уже загружены
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
                setNextIndex((prevIndex) => (prevIndex + 1) % sliders.length);
            }, 5000); // Меняем слайд каждые 5 секунд
            return () => clearInterval(interval);
        }
    }, [sliders]);

    return (
        <div className="auto-slider">
            {sliders ?
                sliders.map((item, idx) => (
                    <Slide type={idx === currentIndex ? "current" : idx === nextIndex ? "next" : "none"} key={idx} image={process.env.REACT_APP_API_URL + item.image} label={item.label} description={item.description} />
                ))
                : <></>}
        </div>
    );
};

export default AutoSlider;