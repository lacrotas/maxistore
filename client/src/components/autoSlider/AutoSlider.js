import React, { useState, useEffect } from 'react';
import Slide from "./slide/Slide";
import './AutoSlider.scss';
import { fetchSliders } from "../../http/SliderApi";


const AutoSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        fetchSliders().then(data => setSliders(data || []));
    }, []);

    useEffect(() => {
        if (sliders.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % sliders.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [sliders]);

    return (
        <div className="auto-slider">
            {sliders.map((item, idx) => (
                <Slide 
                    key={idx} 
                    image={process.env.REACT_APP_API_URL + item.image} 
                    label={item.label} 
                    description={item.description}
                    isActive={idx === currentIndex}
                />
            ))}
            <div className="slider-indicators">
                {sliders.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AutoSlider;