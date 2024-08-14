import classNames from 'classnames/bind';

import styles from './MailList.module.scss';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);
const MailList = () => {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Save time, save money !</h1>
            <span className={cx('description')}>Sign up and we'll send the best deals to you.</span>
            <div className={cx('input')}>
                <input type="text" placeholder="Your Email" />

                <Button small primary>
                    Subscribe
                </Button>
            </div>
        </div>
    );
};

export default MailList;
