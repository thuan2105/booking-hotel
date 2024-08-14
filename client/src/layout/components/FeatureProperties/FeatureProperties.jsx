import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as hotelService from '~/services/hotelService';

import styles from './FeatureProperties.module.scss';

const cx = classNames.bind(styles);

const limit = 4;
const featured = { featured: true };
const FeatureProperties = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        hotelService
            .propertiesHotel(featured, limit)
            .then((data) => data.success && setData(data.data))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className={cx('wrapper')}>
            {data.map((item) => (
                <div key={item._id} className={cx('item')}>
                    <img
                        className={cx('img')}
                        src={
                            `${item.photos[0]}` ||
                            'https://thcsgiangvo-hn.edu.vn/wp-content/uploads/2023/09/anh-loading.jpg'
                        }
                        alt=""
                    />
                    {console.log()}
                    <span className={cx('name')}>{item.name}</span>
                    <span className={cx('city')}>{item.city}</span>
                    <span className={cx('price')}>Starting from ${item.distance}</span>
                    {item.rating && (
                        <div className={cx('rating')}>
                            <button>{item.rating}</button>
                            <span>Excellent</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FeatureProperties;
