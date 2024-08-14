import className from 'classnames/bind';

import styles from './GlobalStyles.scss';
import { useContext } from 'react';
import { DarkModeContext } from '~/contexts/darkMode/darkModeContext';

const cx = className.bind(styles);
const GlobalStyles = ({ children }) => {
    const { darkMode } = useContext(DarkModeContext);
    return <div className={cx('container', `${darkMode ? 'dark' : ''}`)}>{children}</div>;
};

export default GlobalStyles;
