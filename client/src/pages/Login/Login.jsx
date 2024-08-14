import 'tippy.js/dist/tippy.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Tippy from '@tippyjs/react/';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

import config from '~/config';
import images from '~/assets/images';
import Button from '~/components/Button';
import styles from './Login.module.scss';
import { AuthContext } from '~/contexts/AuthContext';
import * as accountService from '~/services/accountService';
import { FacebookIcon, GoogleIcon, AppleIcon } from '~/components/Icons';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from '~/utils/constants';
import { validationSchema } from '~/utils/validationSchema';

const cx = classNames.bind(styles);
const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });
    const [errData, setErrData] = useState(false);
    const { loggedIn, isLoading, error: errorData, dispatch } = useContext(AuthContext);
    const handleChange = (e) => {
        const fieldName = e.target.name;
        clearErrors(fieldName);
        setErrData(false);
    };
    const onSubmit = async (formData) => {
        dispatch({ type: LOGIN_START });
        accountService
            .login(formData)
            .then((res) => {
                if (res.success === true) {
                    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
                    navigate('/');
                } else {
                    setErrData(true);
                    dispatch({ type: LOGIN_FAILURE, payload: res.data });
                }
            })
            .catch((error) => console.log(error));
    };
    if (loggedIn) {
        Navigate('/');
    } else {
        return (
            <div className={cx('login')}>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <div className={cx('navbar')}>
                            <Link to={config.routes.login} style={{ color: 'inherit', textDecoration: 'none' }}>
                                <h2 className={cx('logo')}>Trivago.vn</h2>
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
                                        <FontAwesomeIcon icon={faQuestionCircle} />
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
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('body')}>
                        <div className={cx('item')}>
                            <div className={cx('title')}>
                                <h3>Sign In</h3>
                                <Link to={config.routes.register} className={cx('title-link')}>
                                    or Create An Account
                                </Link>
                            </div>
                            <div className={cx('input-item')}>
                                <label htmlFor="">Email</label>
                                <input
                                    {...register('email')}
                                    type="text"
                                    placeholder="yahoo@gmail.com"
                                    name="email"
                                    className={cx('input')}
                                    onChange={handleChange}
                                />
                                {errors.email && <span className={cx('input-error')}>{errors.email.message}</span>}
                            </div>
                            <div className={cx('input-item')}>
                                <label htmlFor="">Password</label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    autoComplete="on"
                                    className={cx('input')}
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <span className={cx('input-error')}>{errors.password.message}</span>
                                )}
                                {errData && <span className={cx('input-error')}>{errorData.message}</span>}
                            </div>
                            <Button disabled={isLoading} primary className={cx('btn')}>
                                Login
                            </Button>
                        </div>
                        <div className={cx('option')}>
                            <div className={cx('option-divider')}>
                                <hr />
                                <span>or use one of these options</span>
                                <hr />
                            </div>
                            <div className={cx('option-btn')}>
                                <a href="/login" className={cx('option-link')}>
                                    <div className={cx('option-img')}>
                                        <FacebookIcon className={cx('facebook-icon')} />
                                    </div>
                                </a>
                                <a href="/login" className={cx('option-link')}>
                                    <div className={cx('option-img')}>
                                        <GoogleIcon />
                                    </div>
                                </a>
                                <a href="/login" className={cx('option-link')}>
                                    <div className={cx('option-img')}>
                                        <AppleIcon className={cx('apple-icon')} />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </form>

                    <div className={cx('footer')}>
                        <div className={cx('footer-content')}>
                            <div className={cx('footer-item')}>
                                By signing in or creating an account, you agree with our{' '}
                                <a href="/login">Terms & Conditions </a>
                                and <a href="/login">Privacy Statement</a>
                            </div>
                            <div className={cx('footer-item')}>
                                All rights reserved. <br />
                                Copyright (2006-2024) – Booking.com™
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;
