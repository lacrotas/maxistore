import MainPage from "../userPages/MainPage";
import {
    MAIN_ROUTE, BUSKET_ROUTE, ITEM_ROUTE, AMIN_MAIN_ROUTE, SLIDER_REDUCT_ROUTE, ITEM_PREVIEW_ROUTE,
    SLIDE_ADD_ROUTE, KATEGORY_REDUCT_ROUTE, CURRENT_KATEGORY_REDUCT_ROUTE, LOGIN_ROUTE, CURRENT_POD_KATEGORY_REDUCT_ROUTE,
    FILTER_REDUCT_ROUTE, CURRENT_KATEGORY_FILTER_REDUCT_ROUTE, ITEM_REDUCT_ROUTE, NEW_ITEM_POST_ROUTE, NEW_ITEM_REDUCT_ROUTE,
    QWESTION_REDUCT_ROUTE, REVIEW_REDUCT_ROUTE, CURRENT_POD_KATEGORY_FILTER_REDUCT_ROUTE, ITEM_SEARCH_ROUTE, ITEM_MAIN_ROUTE
} from './Const';
import BasketPage from "../userPages/BasketPage";
import ItemPage from "../userPages/itemPage/ItemPage";
import SliderReduct from "../adminPages/sliderReduct/SliderReduct";
import MainAdminPage from "../adminPages/MainAdminPage";
import CurrentSliderReduct from "../adminPages/sliderReduct/components/currentSliderReduct/CurrentSliderReduct";
import KategoryReduct from "../adminPages/kategoryReduct/KategoryReduct";
import CurrentKategoryReduct from "../adminPages/kategoryReduct/components/currentKategoryReduct/CurrentKategoryReduct";
import LoginPage from "../userPages/loginPage/LoginPage";
import CurrentPodKategoryReduct from "../adminPages/kategoryReduct/components/currentPodKategoryReduct/CurrentPodKategoryReduct";
import FilterReduct from "../adminPages/filterReduct/FilterReduct";
import KategoryFilterReduct from "../adminPages/filterReduct/components/kategoryFilterReduct/KategoryFilterReduct";
import ItemReduct from "../adminPages/itemReduct/ItemReduct";
import NewItemAdd from "../adminPages/itemReduct/newItemAdd/NewItemAdd";
import ReviewReduct from "../adminPages/reviewReduct/ReviewReduct";
import QwestionReduct from "../adminPages/qwestionReduct/QwestionReduct";
import NewItemReduct from "../adminPages/itemReduct/newItemReduct/NewItemReduct";
import ItemFullPreview from "../userPages/itemPage/components/itemFullPreview/ItemFullPreview";
import PodKategoryFilterReduct from "../adminPages/filterReduct/components/podKategoryFilterReduct/PodKategoryFilterReduct";
import ItemSearchPage from "../userPages/itemSearchPage/ItemSearchPage";
import ItemPageMainKategory from "../userPages/itemPageMainKategory/ItemPageMainKategory";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: BUSKET_ROUTE,
        Component: BasketPage
    },
    {
        path: ITEM_ROUTE,
        Component: ItemPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: ITEM_SEARCH_ROUTE,
        Component: ItemSearchPage
    },
    {
        path: ITEM_PREVIEW_ROUTE + '/:id',
        Component: ItemFullPreview
    },
    {
        path: ITEM_MAIN_ROUTE + '/:id',
        Component: ItemPageMainKategory
    },
];

export const adminRoutes = [
    {
        path: SLIDER_REDUCT_ROUTE,
        Component: SliderReduct
    },
    {
        path: AMIN_MAIN_ROUTE,
        Component: MainAdminPage,
    },
    {
        path: SLIDE_ADD_ROUTE,
        Component: CurrentSliderReduct
    },
    {
        path: KATEGORY_REDUCT_ROUTE,
        Component: KategoryReduct
    },
    {
        path: CURRENT_KATEGORY_REDUCT_ROUTE,
        Component: CurrentKategoryReduct,
    },
    {
        path: CURRENT_POD_KATEGORY_REDUCT_ROUTE,
        Component: CurrentPodKategoryReduct,
    },
    {
        path: FILTER_REDUCT_ROUTE,
        Component: FilterReduct,
    },
    {
        path: CURRENT_KATEGORY_FILTER_REDUCT_ROUTE,
        Component: KategoryFilterReduct,
    },
    {
        path: CURRENT_POD_KATEGORY_FILTER_REDUCT_ROUTE,
        Component: PodKategoryFilterReduct,
    },
    {
        path: ITEM_REDUCT_ROUTE,
        Component: ItemReduct,
    },
    {
        path: NEW_ITEM_POST_ROUTE,
        Component: NewItemAdd,
    },
    {
        path: QWESTION_REDUCT_ROUTE,
        Component: QwestionReduct,
    },
    {
        path: REVIEW_REDUCT_ROUTE,
        Component: ReviewReduct,
    },
    {
        path: NEW_ITEM_REDUCT_ROUTE,
        Component: NewItemReduct,
    }
]
//     {
//         path: MAIN_ROUTE,
//         Component: MainPage
//     },
//     {
//         path: EXPERT_ADMIN_ROUTE + '/:id',
//         Component: AdminCurrentExpertInfo
//     },
//     {
//         path: EXPERT_ADMIN_ROUTE,
//         Component: AdminExpertPage
//     },
//     {
//         path: ADMIN_MAIN_ROUTE,
//         Component: AdminMainPage
//     },
//     {
//         path: COUNTRY_ADMIN_ROUTE,
//         Component: AdminCountryPage
//     },
//     {
//         path: CITY_ADMIN_ROUTE,
//         Component: AdminCityPage
//     },
//     {
//         path: CITY_ADMIN_ROUTE + "/:id",
//         Component: CurrentAdminCityPage
//     },
//     {
//         path: MEATING_ADMIN_ROUTE,
//         Component: AdminMeatingPage
//     },
//     {
//         path: ADD_ADMIN_ROUTE,
//         Component: MainPage
//     },
//     {
//         path: USER_REDUCT,
//         Component: AdminUserReductPage
//     },
//     {
//         path: ADMIN_SPONSOR,
//         Component: AdminSponsorPage
//     }
// ];