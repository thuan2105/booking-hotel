import classNames from 'classnames/bind';
import styles from './Overlay.module.scss';

const cx = classNames.bind(styles);
const Overlay = ({ background, onClick, show = false }) => {
    const handleOverlayClick = () => {
        onClick();
    };
    return show && <div onClick={handleOverlayClick} className={cx('overlay', background && 'background')}></div>;
};

export default Overlay;
