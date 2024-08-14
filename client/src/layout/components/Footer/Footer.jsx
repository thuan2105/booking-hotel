import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('lists')}>
                <ul className={cx('list')}>
                    <li className={cx('list-item')}>Countries</li>
                    <li className={cx('list-item')}>Regions</li>
                    <li className={cx('list-item')}>Cities</li>
                    <li className={cx('list-item')}>Districts</li>
                    <li className={cx('list-item')}>Airports</li>
                    <li className={cx('list-item')}>Hotels</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('list-item')}>Homes</li>
                    <li className={cx('list-item')}>Apartments</li>
                    <li className={cx('list-item')}>Resorts</li>
                    <li className={cx('list-item')}>Villas</li>
                    <li className={cx('list-item')}>Hostels</li>
                    <li className={cx('list-item')}>Guest houses</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('list-item')}>Unique places to stay</li>
                    <li className={cx('list-item')}>Reviews</li>
                    <li className={cx('list-item')}>Unpacked: Travel articles</li>
                    <li className={cx('list-item')}>Travel communities</li>
                    <li className={cx('list-item')}>Seasonal and holiday deals</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('list-item')}>Car rental</li>
                    <li className={cx('list-item')}>Flight Finder</li>
                    <li className={cx('list-item')}>Restaurant reservations</li>
                    <li className={cx('list-item')}>Travel Agents</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('list-item')}>Curtomer Service</li>
                    <li className={cx('list-item')}>Partner Help</li>
                    <li className={cx('list-item')}>Sustainability</li>
                    <li className={cx('list-item')}>Press center</li>
                    <li className={cx('list-item')}>Safety Resource Center</li>
                    <li className={cx('list-item')}>Investor relations</li>
                    <li className={cx('list-item')}>Terms & conditions</li>
                </ul>
            </div>
            <div className={cx('text')}>
                <hr />
                <p>Copyright © 2023 Lamabooking.</p>
            </div>
        </div>
    );
};

export default Footer;
