import './SliderItem.scss';
import CustomButton from '../../../../../customUI/customButton/CustomButton';
import { SLIDE_ADD_ROUTE } from "../../../../appRouter/Const";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function SliderItem({ label, image, description, link, id}) {
    return (
        <div className='slider_item--short'>
            <div className='short_container'>
                <img className='slider_item--image' src={image} alt='test' />
                <p className='short_container_label tiny_p'>{label}</p>
            </div>
            <NavLink to={{ pathname: SLIDE_ADD_ROUTE, state: { label: label, image: image, description: description, link: link, id: id } }} >
                <CustomButton text={"Редактировать"} />
            </NavLink>
        </div >
    );
}

export default SliderItem;