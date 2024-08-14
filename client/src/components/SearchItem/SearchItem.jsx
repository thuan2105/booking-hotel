import classNames from 'classnames/bind';

import styles from './SearchItem.module.scss';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const SearchItem = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
                alt=""
                className={cx('img')}
            />
            <div className={cx('description')}>
                <h1 className={cx('title')}>{item.name}</h1>
                <span className={cx('distance')}>{item.distance}m from center</span>
                <span className={cx('taxi')}>Free airport taxi</span>
                <span className={cx('sub__title')}>Studio Apartment with Air conditioning</span>
                <span className={cx('features')}>{item.description}</span>
                <span className={cx('cancel')}>Free cancellation</span>
                <span className={cx('cancel-sub_title')}>You can cancel later, so lock in this great price today!</span>
            </div>
            <div className={cx('details')}>
                {item.rating && (
                    <div className={cx('rating')}>
                        <span>Excellent</span>
                        <button>{item.rating}</button>
                    </div>
                )}
                <div className={cx('detail-text')}>
                    <span className={cx('price')}>${item.cheapestPrice}</span>
                    <span className={cx('tax')}>Includes taxes and fees</span>
                    <Button onClick={() => navigate(`/hotels/${item._id}`)} primary>
                        See availability
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
