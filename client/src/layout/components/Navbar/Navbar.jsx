import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '~/components/Button';
import config from '~/config';
import { AuthContext } from '~/contexts/AuthContext';
import { LOGOUT } from '~/utils/constants';
import images from '~/assets/images';
import {
    faBell,
    faCircleQuestion,
    faCreditCard,
    faHeart,
    faPenToSquare,
    faUser,
} from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faGift, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Overlay from '~/components/Overlay';

const cx = classNames.bind(styles);
const Navbar = () => {
    const navigate = useNavigate();
    const { loggedIn, user, dispatch } = useContext(AuthContext);
    const [openAccMenu, setOpenAccMenu] = useState(false);
    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');
    };

    const handleToggleAccMenu = () => {
        setOpenAccMenu(!openAccMenu);
    };
    const handleOverlay = () => {
        setOpenAccMenu(true);
    };

    return (
        <div className={cx('navbar')}>
            <div className={cx('wrapper')}>
                <Link to={config.routes.home} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <h2 className={cx('logo')}>Tricago.com</h2>
                </Link>
                {loggedIn ? (
                    <div className={cx('navbar-right')}>
                        <Tippy
                            duration={500}
                            content="Select you language"
                            placement="bottom"
                            animation="fade"
                            arrow={false}
                        >
                            <img className={cx('icon-flag')} src={images.vietNamNationalFlag} alt="" />
                        </Tippy>
                        <Tippy
                            duration={500}
                            content="Help and support"
                            placement="bottom"
                            animation="fade"
                            arrow={false}
                        >
                            <a href="/" className={cx('icon-help')}>
                                <FontAwesomeIcon icon={faCircleQuestion} />
                            </a>
                        </Tippy>
                        <Tippy
                            duration={500}
                            content="View your notifications"
                            placement="bottom"
                            animation="fade"
                            arrow={false}
                        >
                            <a href="/" className={cx('icon-help')}>
                                <FontAwesomeIcon icon={faBell} />
                            </a>
                        </Tippy>
                        {!openAccMenu && <Overlay onClick={handleOverlay} />}
                        <div className={cx('account')} onClick={handleToggleAccMenu}>
                            <FontAwesomeIcon className={cx('account-icon')} icon={faUser} />
                            <div className={cx('account-text')}>
                                <p className={cx('account-name')}>{`${user.lastName} ${user.firstName}`}</p>
                                <span className={cx('account-level')}>Genius Level 1</span>
                            </div>
                            <ul className={!openAccMenu ? cx('account-menu', 'open') : cx('account-menu')}>
                                <li className={cx('account-menu-item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    <span className={cx('link')}>User management</span>
                                </li>
                                <Link
                                    className={cx('account-menu-item')}
                                    to={config.routes.cart}
                                    state={{ payment: false }}
                                >
                                    <li>
                                        <FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />
                                        <span className={cx('link')}>Cards</span>
                                    </li>
                                </Link>
                                <Link
                                    className={cx('account-menu-item')}
                                    to={config.routes.cart}
                                    state={{ payment: true }}
                                >
                                    <li>
                                        <FontAwesomeIcon className={cx('icon')} icon={faCreditCard} />
                                        <span className={cx('link')}>The hotel you booked</span>
                                    </li>
                                </Link>
                                <li className={cx('account-menu-item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faGift} />
                                    <span className={cx('link')}>Giveaways & wallets</span>
                                </li>
                                <li className={cx('account-menu-item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
                                    <span className={cx('link')}>Evaluate</span>
                                </li>
                                <li className={cx('account-menu-item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                                    <span className={cx('link')}>Favourite</span>
                                </li>
                                <Link
                                    onClick={handleLogout}
                                    className={cx('account-menu-item')}
                                    to={config.routes.login}
                                >
                                    <li>
                                        <FontAwesomeIcon className={cx('icon')} icon={faRightFromBracket} />
                                        <span className={cx('link')}>Logout</span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className={cx('item')}>
                        <Link to={'/login'}>
                            <Button className={cx('btn')}>Login</Button>
                        </Link>
                        <Link to={'/register'}>
                            <Button className={cx('btn')}>Register</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
