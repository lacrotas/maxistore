import React, { useState, useEffect } from 'react';
import FirstImage from "../../assets/images/slider/1.png";
import SecondImage from "../../assets/images/slider/2.png";
import tHIRDImage from "../../assets/images/slider/6.png";
import FORImage from "../../assets/images/slider/5.png";
import Slide from "./slide/Slide";
import './AutoSlider.scss';

const sliderData = [
    { label: "Беговая дорожка Funfit", description: "С массажером, гантелями и твистером", image: FirstImage },
    { label: "Батут Calviano smile", description: "Батут пружинный с внутренней сеткой", image: SecondImage },
    { label: "Беговая дорожка Funfit", description: "С массажером, гантелями и твистером", image: tHIRDImage },
    { label: "Батут Calviano smile", description: "Батут пружинный с внутренней сеткой", image: FORImage }
];


const AutoSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);

    const sliderBloks = sliderData.map((item, idx) => (
        <Slide type={idx === currentIndex ? "current" : idx === nextIndex ? "next" : "none"} key={idx} image={item.image} label={item.label} description={item.description} />
    ));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderBloks.length);
            setNextIndex((prevIndex) => (prevIndex + 1) % sliderBloks.length);
        }, 5000); // Меняем слайд каждые 3 секунды
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="auto-slider">
            {sliderBloks}
        </div>
    );
};

export default AutoSlider;