import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Feature from '~/layout/components/Feature';
import Header from '~/layout/components/Header';
import Navbar from '~/layout/components/Navbar';
import PropertyList from '~/layout/components/PropertyList';
import FeatureProperties from '~/layout/components/FeatureProperties';
import MailList from '~/layout/components/MailList';
import Footer from '~/layout/components/Footer';

const cx = classNames.bind(styles);
const Home = () => {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <Header />
            <div className={cx('content')}>
                <Feature />
                <h1 className={cx('title')}>Browse by property type</h1>
                <PropertyList />

                <h1 className={cx('title')}>Home guests love</h1>
                <FeatureProperties />
            </div>
            <MailList />
            <Footer />
        </div>
    );
};

export default Home;
