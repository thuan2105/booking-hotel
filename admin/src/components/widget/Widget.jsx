import classNames from 'classnames/bind';

import styles from './Widget.module.scss';
import {
    AccountBalanceWalletOutlined,
    KeyboardArrowUpOutlined,
    MonetizationOnOutlined,
    PersonOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';

const cx = classNames.bind(styles);

const Widget = ({ type }) => {
    let data;

    const amount = 100;
    const diff = 20;

    switch (type) {
        case 'user':
            data = {
                title: 'USER',
                isMoney: false,
                link: 'See all users',
                icon: <PersonOutlined className={cx('widget-icon', 'brg-person')} />,
            };
            break;
        case 'order':
            data = {
                title: 'ORDER',
                isMoney: true,
                link: 'View all order',
                icon: <ShoppingCartOutlined className={cx('widget-icon', 'brg-cart')} />,
            };
            break;
        case 'earning':
            data = {
                title: 'EARNINGS',
                isMoney: false,
                link: 'View net earnings',
                icon: <MonetizationOnOutlined className={cx('widget-icon', 'brg-money')} />,
            };
            break;
        case 'balance':
            data = {
                title: 'BALANCE',
                isMoney: false,
                link: 'See details',
                icon: <AccountBalanceWalletOutlined className={cx('widget-icon', 'brg-acc')} />,
            };
            break;
        default:
            break;
    }
    return (
        <div className={cx('widget')}>
            <div className={cx('widget-left')}>
                <span className={cx('widget-title')}>{data.title}</span>
                <span className={cx('widget-counter')}>
                    {data.isMoney && '$'} {amount}
                </span>
                <span className={cx('widget-link')}>{data.link}</span>
            </div>
            <div className={cx('widget-right')}>
                <div className={cx('widget-percentage', 'positive')}>
                    <KeyboardArrowUpOutlined />
                    {`${diff} %`}
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
