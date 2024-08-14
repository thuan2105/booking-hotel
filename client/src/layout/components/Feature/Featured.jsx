import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import * as featureService from '~/services/hotelService';

import styles from './Featured.module.scss';

const cx = classNames.bind(styles);

const cities = 'London,Berlin,Tokyo';
const Feature = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        featureService
            .feature(cities)
            .then((data) => data.success && setData(data.listHotel))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className={cx('featured')}>
            <div className={cx('featured-item')}>
                <img
                    className={cx('featured-img')}
                    src="https://eutrip.vn/view/admin/Themes/kcfinder/upload/images/danhmuctour/Anh/DIA-DIEM-DU-LICH-O-LONDON-ANH-EUTRIP.jpg"
                    alt=""
                />
                <div className={cx('featured-titles')}>
                    <h1>London</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className={cx('featured-item')}>
                <img
                    className={cx('featured-img')}
                    src="https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Germany/Berlin/berlin-GettyImages-154341690.jpg"
                    alt=""
                />
                <div className={cx('featured-titles')}>
                    <h1>Berlin</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>

            <div className={cx('featured-item')}>
                <img
                    className={cx('featured-img')}
                    src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/7/7/1065174/2020-03-11-Session-T.jpg"
                    alt=""
                />
                <div className={cx('featured-titles')}>
                    <h1>Tokyo</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div>
        </div>
    );
};

export default Feature;
