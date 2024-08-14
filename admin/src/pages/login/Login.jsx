import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';

import styles from './Login.module.scss';
import images from '~/assets/images';
import { HelpOutlineOutlined } from '@mui/icons-material';
import config from '~/config';
import { AuthContext } from '~/contexts/authContext/AuthContext';
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from '~/utils/constant/constant';
import * as accountService from '~/services/accountService';

const cx = classNames.bind(styles);

const Login = () => {
    const [credential, setCredential] = useState({
        userName: undefined,
        password: undefined,
    });
    const navigate = useNavigate();
    const { isLoading, error, dispatch } = useContext(AuthContext);
    console.log(error);
    const handleChange = (e) => {
        setCredential((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: LOGIN_START });
        accountService
            .login(credential)
            .then((res) => {
                if (res.success === true && res.data.details.isAdmin) {
                    console.log(res);
                    dispatch({ type: LOGIN_SUCCESS, payload: res.data.details });
                    navigate('/');
                } else {
                    dispatch({ type: LOGIN_FAILURE, payload: 'You are not allows!' });
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
            });
    };
    return (
        <div className={cx('login')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('navbar')}>
                        <Link to={config.route.login} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <h2 className={cx('logo')}>Booking Admin</h2>
                        </Link>
                        <div className={cx('navbar-right')}>
                            <Tippy
                                duration={500}
                                content="Help and support"
                                placement="bottom"
                                animation="fade"
                                arrow={false}
                            >
                                <a href="/login" className={cx('icon-help')}>
                                    <HelpOutlineOutlined />
                                </a>
                            </Tippy>
                            <Tippy
                                duration={500}
                                content="Select you language"
                                placement="bottom"
                                animation="fade"
                                arrow={false}
                            >
                                <img className={cx('icon-flag')} src={images.vietNamNationalFlag} alt="" />
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('item')}>
                        <h3 className={cx('title')}>Log In As Administrator</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            name="userName"
                            className={cx('input')}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className={cx('input')}
                            onChange={handleChange}
                        />
                        <button onClick={handleSubmit} className={cx('btn-submit')}>
                            Login
                        </button>
                        {error !== null && <span>{error}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
