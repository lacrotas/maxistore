import "./SliderReduct.scss";
import SliderItem from "./components/sliderItem/SliderItem";
import CustomButton from "../../../customUI/customButton/CustomButton";
import Headers from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { fetchSliders } from "../../../http/SliderApi";
import { useEffect, useState } from "react";
import { SLIDE_ADD_ROUTE } from "../../appRouter/Const";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function SliderReduct() {
    const [sliders, setSliders] = useState(false);

    useEffect(() => {
        fetchSliders().then(data => setSliders(data));
    }, []);
    return (
        <>
            <Headers isAdminHeader={true}/>
            <div className="sliderReduct">
                <NavLink to={SLIDE_ADD_ROUTE}>
                    <CustomButton text={"Добавить слайд"} />
                </NavLink>
                {sliders ?
                    <>
                        {sliders.map((item, index) => (
                            <SliderItem label={item.label} key={index} image={process.env.REACT_APP_API_URL + item.image} description={item.description} link={item.link} id={item.id} />
                        ))}
                    </>
                    : <></>}
            </div>
            <Footer />
        </>
    );
}

export default SliderReduct;