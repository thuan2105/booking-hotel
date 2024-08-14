import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Widget from '~/components/widget';
import Featured from '~/components/featured';
import Chart from '~/components/chart';
import Table from '~/components/table/Table';

const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('widgets')}>
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
            </div>
            <div className={cx('charts')}>
                <Featured />
                <Chart aspect={2 / 1} title="Last 6 Months (Revenue)" />
            </div>

            <div className={cx('list')}>
                <div className={cx('title')}>Latest Transactions</div>
                {/* <Table /> */}
            </div>
        </div>
    );
};

export default Home;
