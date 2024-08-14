import classNames from 'classnames/bind';

import styles from './DetailUser.module.scss';
import Chart from '~/components/chart';
import Table from '~/components/table';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const DetailUser = () => {
    const { state } = useLocation();
    console.log(state);
    return (
        <div className={cx('single')}>
            <div className={cx('single-top')}>
                <div className={cx('single-top-left')}>
                    <div className={cx('edit-btn')}>Edit</div>
                    <h1 className={cx('title')}>Information</h1>
                    <div className={cx('content')}>
                        <img src={state.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="" className={cx('img')} />
                        <div className={cx('details')}>
                            <h1 className={cx('detail-name')}>{state.userName}</h1>
                            <div className={cx('detail-item')}>
                                <span className={cx('detail-key')}>Email:</span>
                                <span className={cx('detail-value')}>{state.email}</span>
                            </div>
                            <div className={cx('detail-item')}>
                                <span className={cx('detail-key')}>Phone:</span>
                                <span className={cx('detail-value')}>{state.phone}</span>
                            </div>
                            <div className={cx('detail-item')}>
                                <span className={cx('detail-key')}>Address:</span>
                                <span className={cx('detail-value')}>{state.city}</span>
                            </div>
                            <div className={cx('detail-item')}>
                                <span className={cx('detail-key')}>Country:</span>
                                <span className={cx('detail-value')}>{state.country}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('single-top-right')}>
                    <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
                </div>
            </div>
            <div className={cx('single-bottom')}>
                <div className={cx('title')}>Last Transaction</div>
                {/* <Table /> */}
            </div>
        </div>
    );
};

export default DetailUser;
