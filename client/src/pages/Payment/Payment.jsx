import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import * as paymentService from '~/services/paymentService';
import styles from './Payment.module.scss';
import Footer from '~/layout/components/Footer';
import Navbar from '~/layout/components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Paypal from '~/components/Paypal';
import Button from '~/components/Button';
import { AuthContext } from '~/contexts/AuthContext';
import { confirmPaymentMethod } from '~/components/Modal/contentModal';

const cx = classNames.bind(styles);

const Payment = () => {
    let total;

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { _id, hotelName, rooms, hotelId } = location.state;
    const [selectedOption, setSelectedOption] = useState('cash');
    const handleOptionChange = (event) => {
        const { value } = event.target;
        setSelectedOption(value);
    };
    const { _id: userId } = user;
    const payload = { _id, userId, hotelId, selectedOption };
    const handlePayment = () => {
        paymentService
            .payment(payload)
            .then(
                (res) =>
                    res.success &&
                    navigate('/cart', {
                        state: {
                            payment: true,
                            selectedOption,
                            modal: {
                                open: true,
                                content: confirmPaymentMethod,
                            },
                        },
                    }),
            )
            .catch((error) => console.log(error));
    };

    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('content')}>
                <div className={cx('content-list')}>
                    <div className={cx('titles')}>
                        <h3 className={cx('title-item', 'style-text')}>Hotel</h3>
                        <h3 className={cx('title-item', 'style-text', 'title-item-room', 'room')}>Room</h3>
                        <h3 className={cx('title-item', 'style-text')}>Total payment</h3>
                    </div>
                    <div className={cx('titles')}>
                        <h3 className={cx('title-item')}>{hotelName}</h3>
                        <div className={cx('title-item', 'title-item-room', 'room')}>
                            {rooms.map((room, index) => (
                                <div className={cx('border-bottom')} key={index}>
                                    <div className={cx('room-item')}>
                                        <p>Room number: {room.roomNumbers.join(', ')}</p>
                                        <p>Description: {room.description}</p>
                                        <p>Max people: {room.maxPeople}</p>
                                        <p>Price: ${room.totalPrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h3 className={cx('title-item')}>
                            $
                            {rooms
                                .map((room) => room.totalPrice)
                                .reduce((acc, totalPrice) => {
                                    total = acc + totalPrice;
                                    return total;
                                }, 0)}
                        </h3>
                    </div>
                </div>
                <div className={cx('payment')}>
                    <h3>Please choose payment method</h3>
                    <div className={cx('options')}>
                        <form>
                            <div className={cx('option-item')}>
                                <input
                                    checked={selectedOption === 'cash'}
                                    value="cash"
                                    type="radio"
                                    id="later_money"
                                    onChange={handleOptionChange}
                                />
                                <label className={cx('option-label')} htmlFor="later_money">
                                    Payment in cash
                                </label>
                            </div>
                            <div className={cx('option-item')}>
                                <input
                                    checked={selectedOption === 'paypal'}
                                    value="paypal"
                                    type="radio"
                                    id="payment_paypal"
                                    onChange={handleOptionChange}
                                />
                                <label className={cx('option-label')} htmlFor="payment_paypal">
                                    Payment by paypal
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className={cx('paypal')}>
                        {selectedOption === 'cash' ? (
                            <Button onClick={handlePayment} primary>
                                Confirm payment in cash
                            </Button>
                        ) : (
                            <Paypal payload={payload} amount={total} showSpinner={selectedOption === 'paypal'} />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Payment;
