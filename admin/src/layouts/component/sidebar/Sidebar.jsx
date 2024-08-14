import classNames from 'classnames/bind';
import {
    AccountCircleOutlined,
    PersonOutlineOutlined,
    Store,
    CreditCard,
    InsertChart,
    LocalShipping,
    NotificationsNoneOutlined,
    SettingsSystemDaydreamOutlined,
    PsychologyOutlined,
    SettingsOutlined,
    Dashboard,
    LogoutOutlined,
    BedroomParentOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import config from '~/config';
import { useContext } from 'react';
import { DarkModeContext } from '~/contexts/darkMode/darkModeContext';
import { DARK, LIGHT } from '~/utils/constant/constant';

const cx = classNames.bind(styles);
const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);
    return (
        <div className={cx('wrapper', 'sidebar-mode')}>
            <div className={cx('sidebar-top', 'sidebar-top-mode')}>
                <Link to={config.route.home}>
                    <span className={cx('sidebar-top-logo', 'logo-mode')}>Tricago Admin</span>
                </Link>
            </div>
            <div className={cx('sidebar-center')}>
                <ul className={cx('sidebar-center-list')}>
                    <p className={cx('sidebar-center-heading')}>MAIN</p>
                    <Link to={config.route.home}>
                        <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                            <Dashboard className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                            <span className={cx('sidebar-title')}>Home</span>
                        </li>
                    </Link>
                    <p className={cx('sidebar-center-heading')}>LIST</p>
                    <Link to={config.route.users}>
                        <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                            <PersonOutlineOutlined className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                            <span className={cx('sidebar-title')}>Users</span>
                        </li>
                    </Link>
                    <Link to={config.route.hotels}>
                        <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                            <Store className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                            <span className={cx('sidebar-title')}>Hotels</span>
                        </li>
                    </Link>
                    <Link to={config.route.rooms}>
                        <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                            <BedroomParentOutlined className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                            <span className={cx('sidebar-title')}>Rooms</span>
                        </li>
                    </Link>
                    <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                        <LocalShipping className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                        <span className={cx('sidebar-title')}>Delivery</span>
                    </li>
                    <p className={cx('sidebar-center-heading')}>USEFUL</p>
                    <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                        <InsertChart className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                        <span className={cx('sidebar-title')}>Stats</span>
                    </li>
                    <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                        <NotificationsNoneOutlined className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                        <span className={cx('sidebar-title')}>Notifications</span>
                    </li>
                    <p className={cx('sidebar-center-heading')}>SERVICE</p>
                    <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                        <SettingsSystemDaydreamOutlined className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                        <span className={cx('sidebar-title')}>System Health</span>
                    </li>
                    <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                        <PsychologyOutlined className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                        <span className={cx('sidebar-title')}>Logs</span>
                    </li>
                    <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                        <SettingsOutlined className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                        <span className={cx('sidebar-title')}>Setting</span>
                    </li>
                    <p className={cx('sidebar-center-heading')}>USER</p>
                    <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                        <AccountCircleOutlined className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                        <span className={cx('sidebar-title')}>Profile</span>
                    </li>
                    <li className={cx('sidebar-list-item', 'sidebar-item-mode')}>
                        <LogoutOutlined className={cx('sidebar-icon', 'sidebar-icon-mode')} />
                        <span className={cx('sidebar-title')}>Logout</span>
                    </li>
                </ul>
            </div>
            <div className={cx('sidebar-bottom')}>
                <div className={cx('sidebar-color-option')} onClick={() => dispatch({ type: LIGHT })}></div>
                <div className={cx('sidebar-color-option')} onClick={() => dispatch({ type: DARK })}></div>
            </div>
        </div>
    );
};

export default Sidebar;
