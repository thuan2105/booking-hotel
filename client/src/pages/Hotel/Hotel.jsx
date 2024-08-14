import classNames from 'classnames/bind';

import styles from './Hotel.module.scss';
import Navbar from '~/layout/components/Navbar';
import Header from '~/layout/components/Header';
import DetailHotel from '~/layout/components/DetailHotel';
import MailList from '~/layout/components/MailList';
import Footer from '~/layout/components/Footer';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const Hotel = () => {
    const location = useLocation();
    const idHotel = location.pathname.split('/')[2];

    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <Header type={'list'} />
            <DetailHotel idHotel={idHotel} />
            <MailList />
            <Footer />
        </div>
    );
};

export default Hotel;
