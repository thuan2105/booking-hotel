import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

import config from '~/config';
import images from '~/assets/images';
import Button from '~/components/Button';
import styles from './Register.module.scss';
import { AuthContext } from '~/contexts/AuthContext';
import * as accountService from '~/services/accountService';
import {
    validateEmailRequired,
    validatePhoneRequired,
    validateRequired,
    validateRequiredLetters,
    validateRequiredPassword,
} from '~/utils/validators';

const cx = classNames.bind(styles);

const Register = () => {
    const navigate = useNavigate();
    const { loggedIn, isLoading } = useContext(AuthContext);
    const {
        register,
        setError,
        clearErrors,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleChange = (e) => {
        const fieldName = e.target.name;
        clearErrors(fieldName);
        clearErrors('serverError');
    };
    // const handleFocus = (e) => {
    //     const fieldName = e.target.name;
    //     clearErrors(fieldName);
    //     clearErrors('serverError');
    // };
    console.log(errors);

    const onSubmit = async (formData) => {
        accountService
            .register(formData)
            .then((res) => {
                if (res.success) {
                    navigate('/login');
                } else {
                    setError('serverError', { message: res.data.message });
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
                                        <FontAwesomeIcon icon={faCircleQuestion} />
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
                        <form className={cx('form')}>
                            <div className={cx('title')}>
                                <h3>Sign Up</h3>
                                <Link to={config.routes.login} className={cx('title-link')}>
                                    or Sign In
                                </Link>
                            </div>
                            <div className={cx('wrap-input')}>
                                <div className={cx('input-item')}>
                                    <label htmlFor="">Last name</label>
                                    <input
                                        {...register('lastName', { validate: validateRequiredLetters('Last Name') })}
                                        type="text"
                                        placeholder="Nguyen"
                                        name="lastName"
                                        className={cx('input')}
                                        onChange={handleChange}
                                        // onFocus={handleFocus}
                                    />
                                    {errors.lastName && (
                                        <span className={cx('input-error')}>{errors.lastName.message}</span>
                                    )}
                                </div>
                                <div className={cx('input-item')}>
                                    <label htmlFor="">First name</label>
                                    <input
                                        {...register('firstName', { validate: validateRequiredLetters('First Name') })}
                                        type="text"
                                        placeholder="Son"
                                        name="firstName"
                                        className={cx('input')}
                                        onChange={handleChange}
                                        // onFocus={handleFocus}
                                    />
                                    {errors.firstName && (
                                        <span className={cx('input-error')}>{errors.firstName.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className={cx('input-item')}>
                                <label htmlFor="">Email</label>
                                <input
                                    {...register('email', { validate: validateEmailRequired('Email') })}
                                    type="email"
                                    placeholder="Yahoo@gmail.com"
                                    name="email"
                                    className={cx('input')}
                                    onChange={handleChange}
                                    // onFocus={handleFocus}
                                />
                                {errors.email && <span className={cx('input-error')}>{errors.email.message}</span>}
                                {errors.serverError && (
                                    <span className={cx('input-error')}>{errors.serverError.message}</span>
                                )}
                            </div>
                            <div className={cx('input-item')}>
                                <label htmlFor="">Password</label>
                                <input
                                    {...register('password', { validate: validateRequiredPassword('Password') })}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    autoComplete="on"
                                    className={cx('input')}
                                    onChange={handleChange}
                                    // onFocus={handleFocus}
                                />
                                {errors.password && (
                                    <span className={cx('input-error')}>{errors.password.message}</span>
                                )}
                            </div>

                            <label htmlFor="">Address</label>
                            <input
                                {...register('address', { validate: validateRequired('Address') })}
                                type="text"
                                placeholder="123 Main Street, Anytown"
                                name="address"
                                className={cx('input')}
                                onChange={handleChange}
                                // onFocus={handleFocus}
                            />
                            {errors.address && <span className={cx('input-error')}>{errors.address.message}</span>}

                            <div className={cx('wrap-input')}>
                                <div className={cx('input-item')}>
                                    <label htmlFor="">Country</label>
                                    <input
                                        {...register('country', { validate: validateRequired('Country') })}
                                        type="text"
                                        placeholder="Vietnamese"
                                        name="country"
                                        className={cx('input')}
                                        onChange={handleChange}
                                        // onFocus={handleFocus}
                                    />
                                    {errors.country && (
                                        <span className={cx('input-error')}>{errors.country.message}</span>
                                    )}
                                </div>

                                <div className={cx('input-item')}>
                                    <label htmlFor="">Phone</label>
                                    <input
                                        {...register('phone', { validate: validatePhoneRequired('Phone') })}
                                        type="text"
                                        placeholder="+84 55 632 350"
                                        name="phone"
                                        className={cx('input')}
                                        onChange={handleChange}
                                        // onFocus={handleFocus}
                                    />
                                    {errors.phone && <span className={cx('input-error')}>{errors.phone.message}</span>}
                                </div>
                            </div>

                            <Button onClick={handleSubmit(onSubmit)} disabled={isLoading} primary className={cx('btn')}>
                                Register
                            </Button>
                        </form>
                    </div>

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

export default Register;
