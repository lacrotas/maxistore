import WindowBlock from "../../customUI/windowBlock/WindowBlock";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./MainAdminPage.scss";
import { NavLink } from "react-router-dom";
import { SLIDER_REDUCT_ROUTE, KATEGORY_REDUCT_ROUTE, FILTER_REDUCT_ROUTE, ITEM_REDUCT_ROUTE, QWESTION_REDUCT_ROUTE, REVIEW_REDUCT_ROUTE } from "../appRouter/Const";
function MainAdminPage() {
    return (
        <>
            <Header isAdminHeader={true} />
            <div className="mainAdminPage">
                <NavLink to={ITEM_REDUCT_ROUTE}>
                    <WindowBlock label={"Редактирование товара"} description={"Здесь можно добавить товар на сайт, а так же редактировать существующий"} />
                </NavLink>
                <NavLink to={KATEGORY_REDUCT_ROUTE}>
                    <WindowBlock label={"Редактирование категорий"} description={"Здесь можно добавить категорию на сайт, а так же редактировать существующие"} />
                </NavLink>
                <NavLink to={FILTER_REDUCT_ROUTE}>
                    <WindowBlock label={"Редактирование фильтров"} description={"Здесь можно добавить фильтры на сайт, а так же редактировать существующие"} />
                </NavLink>
                <NavLink to={SLIDER_REDUCT_ROUTE}>
                    <WindowBlock label={"Редактирование слайдера"} description={"Здесь можно добавить слайды на главную, а так же редактировать существующие"} />
                </NavLink>
                <NavLink to={QWESTION_REDUCT_ROUTE}>
                    <WindowBlock label={"Редактирование вопросов"} description={"Здесь можно редактировать секцию вопросов ответов на сайте"} />
                </NavLink>
                <NavLink to={REVIEW_REDUCT_ROUTE}>
                    <WindowBlock label={"Редактирование отзывов"} description={"Здесь можно одобрить или отклонить отзывы к товарам на сайте"} />
                </NavLink>
            </div>
            <Footer />
        </>
    )
}

export default MainAdminPage;