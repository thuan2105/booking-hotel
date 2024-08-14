import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MailList from '~/layout/components/MailList';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';

import images from '~/assets/images';
import Footer from '~/layout/components/Footer';
import Navbar from '~/layout/components/Navbar';
import styles from './Cart.module.scss';
import * as cartService from '~/services/cartService';
import { AuthContext } from '~/contexts/AuthContext';
import Button from '~/components/Button';
import config from '~/config';
import Modal from '~/components/Modal';
import { deleteRoomContent } from '~/components/Modal/contentModal';

const cx = classNames.bind(styles);
const Cart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { payment, modal } = location.state;
    const { user } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(modal?.open ?? false);
    const [data, setData] = useState([]);
    const [paramsId, setParamsId] = useState({});
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useEffect(() => {
        cartService
            .getCart(user._id, { payment })
            .then((data) => {
                setDeleteSuccess(false);
                setData(data.carts);
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, [deleteSuccess || payment]);
    const handleOpenModal = ({ ...paramsId }) => {
        setOpenModal(true);
        setParamsId(paramsId);
        document.body.style.overflow = 'hidden';
    };
    const handleDelete = () => {
        const { roomId, hotelId } = paramsId;
        if (roomId === undefined) {
            cartService
                .deleteHotel(user._id, hotelId)
                .then((data) => data.success && setDeleteSuccess(true))
                .catch((err) => console.log(err));
        } else {
            cartService
                .deleteRoom(user._id, roomId, hotelId)
                .then((data) => data.success && setDeleteSuccess(true))
                .catch((err) => console.log(err));
        }
        document.body.style.overflow = 'unset';
        setOpenModal(false);
    };
    const handleClose = () => {
        setOpenModal(false);
        document.body.style.overflow = 'unset';
    };
    return (
        <div className={cx('wrapper')}>
            {openModal && (
                <Modal
                    openModal={modal?.open ?? openModal}
                    handleClose={handleClose}
                    handleSubmit={handleDelete}
                    content={modal?.content ?? deleteRoomContent}
                />
            )}
            <Navbar />
            <div className={cx('content')}>
                <div className={cx('cart-container')}>
                    <div className={cx('link')}>
                        <Link to={config.routes.home} className={cx('link-text')}>
                            Home
                        </Link>
                        <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                        <p>Cart</p>
                    </div>
                    <>
                        {data.length <= 0 ? (
                            <div className={cx('cart-empty')}>
                                <img className={cx('cart-img')} src={images.earth} alt="" />
                                <h2 className={cx('cart-title')}>You currently have no trips.</h2>
                                <button onClick={() => navigate('/')} className={cx('cart-btn')}>
                                    Reservations
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className={cx('heading')}>The hotels you have booked.</h2>
                                <div className={cx('titles')}>
                                    <h3 className={cx('title-item', 'style-text')}>Hotel</h3>
                                    <h3 className={cx('title-item', 'style-text', 'title-item-address')}>Address</h3>
                                    <div className={cx('title-item-room', 'room', 'd-flex')}>
                                        <h3 className={cx('style-text')}>Room</h3>
                                        <div className={cx('d-flex')}>
                                            <h3 className={cx('style-text', 'margin')}>Check in</h3>
                                            <h3 className={cx('style-text')}>Check out</h3>
                                        </div>
                                    </div>

                                    <h3 className={cx('title-item', 'style-text')}>Total payment</h3>
                                    <h3 className={cx('title-item', 'style-text')}>
                                        {payment ? 'Payment status' : 'Options'}
                                    </h3>
                                </div>

                                {data.length > 0 &&
                                    data.map((item, index) => (
                                        <div key={index} className={cx('titles')}>
                                            <h3 className={cx('title-item')}>{item.hotelName}</h3>
                                            <h3 className={cx('title-item', 'title-item-address')}>
                                                {item.address} {item.city}
                                            </h3>
                                            <div className={cx('title-item', 'title-item-room', 'room')}>
                                                {item.rooms.map((room, index) => (
                                                    <div className={cx('rooms', 'border-bottom')} key={index}>
                                                        <div>
                                                            <div className={cx('room-item')}>
                                                                <p>Room number: {room.roomNumbers.join(', ')}</p>
                                                                <p>Description: {room.description}</p>
                                                                <p>Max people: {room.maxPeople}</p>
                                                                <p>Price: ${room.totalPrice}</p>
                                                            </div>
                                                            {!payment && (
                                                                <div className={cx('btn-del')}>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleOpenModal({
                                                                                roomId: room.roomId,
                                                                                hotelId: item.hotelId,
                                                                            })
                                                                        }
                                                                        className={cx('btn-delete')}
                                                                        small
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className={cx('dates')}>
                                                            <h3 className={cx('title-item')}>{room.startDate}</h3>
                                                            <h3 className={cx('title-item')}>{room.endDate}</h3>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <h3 className={cx('title-item')}>
                                                $
                                                {item.rooms
                                                    .map((room) => {
                                                        return room.totalPrice;
                                                    })
                                                    .reduce((acc, totalPrice) => acc + totalPrice, 0)}
                                            </h3>
                                            {payment ? (
                                                <h3 className={cx('title-item')}>
                                                    {item.paymentMethods === 'cash' ? (
                                                        <span className={cx('cash')}>
                                                            {item.paymentMethods.charAt(0).toUpperCase() +
                                                                item.paymentMethods.slice(1)}
                                                        </span>
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            style={{ color: '#012b88', fontSize: '3em' }}
                                                            icon={faCcPaypal}
                                                        />
                                                    )}
                                                </h3>
                                            ) : (
                                                <div className={cx('list-btn')}>
                                                    <Button
                                                        onClick={() => navigate('/payment', { state: item })}
                                                        className={cx('btn')}
                                                        primary
                                                    >
                                                        Payment
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleOpenModal({ hotelId: item.hotelId })}
                                                        className={cx('btn-delete')}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </>
                        )}
                    </>
                </div>
            </div>
            <MailList />
            <Footer />
        </div>
    );
};

export default Cart;
