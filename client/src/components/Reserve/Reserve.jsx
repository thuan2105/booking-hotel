import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as roomService from '~/services/roomService';
import * as cartService from '~/services/cartService';
import styles from './Reserve.module.scss';
import { SearchContext } from '~/contexts/SearchContext';
import Button from '../Button';
import { AuthContext } from '~/contexts/AuthContext';
import formatDate from '~/utils/formartDate';

const cx = classNames.bind(styles);
const Reserve = ({ setOpen, hotelData }) => {
    // let filterRoom = [];
    const { user } = useContext(AuthContext);
    const { dates } = useContext(SearchContext);

    const [data, setData] = useState([]);
    const [selectedRooms, setSelectedRoom] = useState([]);
    const navigate = useNavigate();

    // Format date
    const startDate = formatDate(dates[0].startDate);
    const endDate = formatDate(dates[0].endDate);

    const { _id, name, address, city } = hotelData;
    const [carts, setCarts] = useState({
        user: user._id,
        cartItems: {
            hotelId: _id,
            hotelName: name,
            rooms: [],
            address: address,
            city: city,
        },
    });
    // if (data.length > 0) {
    //     const rooms = data.map((room) => {
    //         const selectedRoomNumbers = room.roomNumbers.filter((roomNumber) => selectedRooms.includes(roomNumber._id));
    //         if (selectedRoomNumbers.length > 0) {
    //             const totalPrice = selectedRoomNumbers.reduce((acc, curr) => acc + room.price, 0);
    //             const combinedRoom = selectedRoomNumbers.reduce(
    //                 (acc, curr) => {
    //                     return {
    //                         roomId: room._id,
    //                         description: room.description,
    //                         maxPeople: room.maxPeople,
    //                         totalPrice: totalPrice,
    //                         roomNumbers: [...acc.roomNumbers, curr.number],
    //                         startDate,
    //                         endDate,
    //                     };
    //                 },
    //                 { roomId: room._id, price: totalPrice, roomNumbers: [] },
    //             );
    //             return combinedRoom;
    //         }
    //         return undefined;
    //     });
    //     filterRoom = rooms.filter((room) => room !== undefined);
    // }
    const filterRoom = useMemo(() => {
        if (data.length > 0) {
            const rooms = data.map((room) => {
                const selectedRoomNumbers = room.roomNumbers.filter((roomNumber) =>
                    selectedRooms.includes(roomNumber._id),
                );
                if (selectedRoomNumbers.length > 0) {
                    const totalPrice = selectedRoomNumbers.reduce((acc, curr) => acc + room.price, 0);
                    const combinedRoom = selectedRoomNumbers.reduce(
                        (acc, curr) => {
                            return {
                                roomId: room._id,
                                description: room.description,
                                maxPeople: room.maxPeople,
                                totalPrice: totalPrice,
                                roomNumbers: [...acc.roomNumbers, curr.number],
                                startDate,
                                endDate,
                            };
                        },
                        { roomId: room._id, price: totalPrice, roomNumbers: [] },
                    );
                    return combinedRoom;
                }
                return undefined;
            });
            return rooms.filter((room) => room !== undefined);
        }
        return [];
    }, [data, selectedRooms, startDate, endDate]);

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRoom(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    };

    const getDateInRanger = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start);
        let list = [];
        while (date <= end) {
            list.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        list = list.map((date) => formatDate(date));
        return list;
    };

    useEffect(() => {
        setCarts({
            user: user._id,
            cartItems: {
                ...carts.cartItems,
                rooms: [...filterRoom],
            },
        });
        // eslint-disable-next-line
    }, [selectedRooms.length]);

    const allDates = getDateInRanger(dates[0].startDate, dates[0].endDate);
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };
    const isAvailable = (roomNumber) => {
        const set1 = new Set(roomNumber.unavailableDates.map(parseDate).map((date) => date.getTime()));
        for (let date of allDates) {
            const parsedDate = parseDate(date).getTime();
            if (set1.has(parsedDate)) {
                return true;
            }
        }
        return false;
    };

    const handleClick = async () => {
        cartService
            .addToCart(user._id, carts)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        try {
            await Promise.all(
                selectedRooms.map((roomId) =>
                    roomService
                        .updateRoom(roomId, allDates)
                        .then((data) => {
                            setOpen(false);
                            navigate('/');
                        })
                        .catch((err) => console.log(err)),
                ),
            );
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        roomService
            .getRoomHotel(hotelData._id)
            .then((data) => {
                data.success && setData(data.listRooms);
            })
            .catch((err) => console.log(err));
    }, [hotelData._id]);
    return (
        <div className={cx('reserve')}>
            <div className={cx('wrapper')}>
                <FontAwesomeIcon icon={faXmark} className={cx('close')} onClick={() => setOpen(false)} />
                {data.length <= 0 ? (
                    <>
                        <h3 className={cx('title')}>No rooms exist.</h3>
                        <Button onClick={() => setOpen(false)} primary className={cx('button')}>
                            Ok
                        </Button>
                    </>
                ) : (
                    <>
                        <span>Select your rooms: </span>
                        {data.map((item, index) => (
                            <div className={cx('room-item')} key={index}>
                                <div className={cx('room-item-info')}>
                                    <div className={cx('room-title')}>{item.title}</div>
                                    <div className={cx('room-desc')}>{item.description}</div>
                                    <div className={cx('room-max')}>
                                        Max people: <b>{item.maxPeople}</b>
                                    </div>
                                    <div className={cx('room-price')}>{item.price}</div>
                                </div>
                                <div className={cx('room-select')}>
                                    {item.roomNumbers.map((roomNumber, index) => (
                                        <div className={cx('room-number')} key={index}>
                                            <label>{roomNumber.number}</label>
                                            <input
                                                type="checkbox"
                                                value={roomNumber._id}
                                                onChange={handleSelect}
                                                disabled={isAvailable(roomNumber)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Button primary larger onClick={handleClick} className={cx('button')}>
                            Reserve Now!
                        </Button>
                        ,
                    </>
                )}
            </div>
        </div>
    );
};

export default Reserve;
