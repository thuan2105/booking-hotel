import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Sidebar from '../component/sidebar';
import Navbar from '../component/navbar';

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <Sidebar />
                <div className={cx('content')}>
                    <Navbar />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
