import classNames from 'classnames/bind';

import styles from './Navbar.module.scss';
import {
    ChatBubbleOutlineOutlined,
    DarkModeOutlined,
    FullscreenExitOutlined,
    LanguageOutlined,
    ListOutlined,
    NotificationsNoneOutlined,
    SearchOutlined,
} from '@mui/icons-material';
import { useContext } from 'react';
import { DarkModeContext } from '~/contexts/darkMode/darkModeContext';
import { TOGGLE } from '~/utils/constant/constant';

const cx = classNames.bind(styles);
const Navbar = () => {
    const { dispatch } = useContext(DarkModeContext);
    return (
        <div className={cx('navbar', 'navbar-mode')}>
            <div className={cx('navbar-search', 'navbar-search-mode')}>
                <input className={cx('search-input')} type="text" placeholder="Search..." />
                <SearchOutlined className={cx('search-icon')} />
            </div>
            <div className={cx('navbar-list-item')}>
                <div className={cx('navbar-item')}>
                    <LanguageOutlined className={cx('navbar-icon')} />
                    <span className={cx('navbar-title')}>English</span>
                </div>
                <div className={cx('navbar-item')}>
                    <DarkModeOutlined className={cx('navbar-icon')} onClick={() => dispatch({ type: TOGGLE })} />
                </div>
                <div className={cx('navbar-item')}>
                    <FullscreenExitOutlined className={cx('navbar-icon')} />
                </div>
                <div className={cx('navbar-item')}>
                    <NotificationsNoneOutlined className={cx('navbar-icon')} />
                    <span className={cx('navbar-counter')}>1</span>
                </div>
                <div className={cx('navbar-item')}>
                    <ChatBubbleOutlineOutlined className={cx('navbar-icon')} />
                    <span className={cx('navbar-counter')}>2</span>
                </div>
                <div className={cx('navbar-item')}>
                    <ListOutlined className={cx('navbar-icon')} />
                </div>
                <div className={cx('navbar-item')}>
                    <img
                        className={cx('navbar-avatar')}
                        src="https://intomau.com/Content/upload/images/avt-cute-dep.jpg"
                        alt="avatar"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
