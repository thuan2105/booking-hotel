import config from '~/config';
import Cart from '~/pages/Cart';

// Pages
import Home from '~/pages/Home';
import Hotel from '~/pages/Hotel';
import ListHotel from '~/pages/ListHotel';
import Login from '~/pages/Login';
import Payment from '~/pages/Payment';
import Register from '~/pages/Register';

// Public Routes

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.hotels,
        component: Hotel,
    },
    { path: config.routes.listHotels, component: ListHotel },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.payment, component: Payment },
];

// Private Routes

const privateRoutes = [];

export { publicRoutes, privateRoutes };
