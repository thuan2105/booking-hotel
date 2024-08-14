import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCar, faMapLocationDot, faPlane } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SearchHeader from '../SearchHeader';
import { AuthContext } from '~/contexts/AuthContext';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const Header = ({ type }) => {
    const { user } = useContext(AuthContext);
    return (
        <div className={cx('header')}>
            <div className={type === 'list' ? cx('wrapper', 'list-mode') : cx('wrapper')}>
                <div className={cx('header-list')}>
                    <div className={cx('header-list-item', 'active')}>
                        <Button active leftIcon={<FontAwesomeIcon icon={faBed} />} rounded>
                            Stays
                        </Button>
                    </div>
                    <div className={cx('header-list-item')}>
                        <Button disabled rounded leftIcon={<FontAwesomeIcon icon={faPlane} />}>
                            Plights
                        </Button>
                    </div>
                    <div className={cx('header-list-item')}>
                        <Button disabled rounded leftIcon={<FontAwesomeIcon icon={faCar} />}>
                            Car rentals
                        </Button>
                    </div>
                    <div className={cx('header-list-item')}>
                        <Button disabled rounded leftIcon={<FontAwesomeIcon icon={faMapLocationDot} />}>
                            Attractions
                        </Button>
                    </div>
                    <div className={cx('header-list-item')}>
                        <Button disabled rounded leftIcon={<FontAwesomeIcon icon={faCar} />}>
                            Airport taxi
                        </Button>
                    </div>
                </div>

                {type !== 'list' && (
                    <>
                        <h1 className={cx('title')}>A lifetime of discounts? It's Genius.</h1>
                        <p className={cx('description')}>
                            Get rewarded for your travel - unlock instant saving of 10% or more with a free Lamabooking
                            account.
                        </p>
                        {!user && (
                            <Link to={'/login'}>
                                <Button className={cx('btn')} primary>
                                    Login / Register
                                </Button>
                            </Link>
                        )}
                        <SearchHeader />
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
