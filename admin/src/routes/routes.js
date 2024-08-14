import config from '~/config';

import Home from '~/pages/home';
import Login from '~/pages/login';
import DetailUser from '~/pages/detailUser/DetailUser';
import { userColumns, hotelColumns, roomColumns } from '~/data/dataTableSource';
import List from '~/pages/listUser/List';
import AddUser from '~/pages/addUser';
import AddHotel from '~/pages/addHotel';
import AddRoom from '~/pages/addRoom';

const publicRoute = [{ path: config.route.login, component: Login, layout: null }];
const privateRouter = [
    { path: config.route.home, component: Home },
    { path: config.route.users, component: List, props: userColumns },
    { path: config.route.detailUser, component: DetailUser },
    { path: config.route.newUser, component: AddUser },
    { path: config.route.hotels, component: List, props: hotelColumns },
    { path: config.route.detailHotel, component: DetailUser },
    { path: config.route.newHotel, component: AddHotel },
    { path: config.route.rooms, component: List, props: roomColumns },
    { path: config.route.newRoom, component: AddRoom },
];

export { publicRoute, privateRouter };
