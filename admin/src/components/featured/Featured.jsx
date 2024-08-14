import classNames from 'classnames/bind';
import { KeyboardArrowDown, KeyboardArrowUpOutlined, MoreVertOutlined } from '@mui/icons-material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styles from './Featured.module.scss';

const cx = classNames.bind(styles);

const Featured = () => {
    return (
        <div className={cx('featured')}>
            <div className={cx('featured-top')}>
                <h1 className={cx('title')}>Total Revenue</h1>
                <MoreVertOutlined className={cx('icon')} />
            </div>
            <div className={cx('featured-bottom')}>
                <div className={cx('chart')}>
                    <CircularProgressbar value={70} text="70%" strokeWidth={5} />
                </div>
                <div className={cx('content')}>
                    <p className={cx('title')}>Total sales made today</p>
                    <p className={cx('amount')}>$420</p>
                    <p className={cx('desc')}>Previous transactions processing. Last payments may not be included.</p>
                </div>
                <div className={cx('summary')}>
                    <div className={cx('summary-item')}>
                        <div className={cx('summary-title')}>Target</div>
                        <div className={cx('summary-result', 'negative')}>
                            <KeyboardArrowDown className={cx('icon')} />
                            <div className={cx('summary-amount')}>$12.4k</div>
                        </div>
                    </div>
                    <div className={cx('summary-item')}>
                        <div className={cx('summary-title')}>Last Week</div>
                        <div className={cx('summary-result', 'positive')}>
                            <KeyboardArrowUpOutlined className={cx('icon')} />
                            <div className={cx('summary-amount')}>$12.4k</div>
                        </div>
                    </div>
                    <div className={cx('summary-item')}>
                        <div className={cx('summary-title')}>Last Month</div>
                        <div className={cx('summary-result', 'positive')}>
                            <KeyboardArrowUpOutlined className={cx('icon')} />
                            <div className={cx('summary-amount')}>$12.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
