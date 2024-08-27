import MainPage from "../userPages/MainPage";
import {
    MAIN_ROUTE, BUSKET_ROUTE, ITEM_ROUTE
} from './Const';
import BasketPage from "../userPages/BasketPage";
import ItemPage from "../userPages/ItemPage";

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
    // {
    //     path: CITY_ROUTE + '/:id',
    //     Component: CurrentCityPage
    // },
];

// export const adminRoutes = [
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