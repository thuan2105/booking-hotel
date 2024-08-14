import classNames from 'classnames/bind';

import styles from './AddRoom.module.scss';
import { roomInputs } from '~/formSource/formSource';
import { useEffect, useState } from 'react';
import * as hotelService from '~/services/hotelService';
import * as roomService from '~/services/roomService';

const cx = classNames.bind(styles);

const AddRoom = () => {
    const [info, setInfo] = useState({});
    const [idHotel, setHotel] = useState(undefined);
    const [hotelsData, setHotelsData] = useState([]);
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        hotelService
            .getAllHotels()
            .then((data) => setHotelsData(data.data))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(',').map((room) => ({
            number: room.trim(),
        }));
        roomService
            .createRoom(idHotel, { ...info, roomNumbers })
            .then((data) => {
                return;
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-top')}>
                <h1 className={cx('title')}>Add Room New</h1>
            </div>
            <div className={cx('wrapper-bottom')}>
                <div className={cx('wrapper-right')}>
                    <form className={cx('form')}>
                        {roomInputs.map((input) => {
                            return (
                                <div className={cx('form-input')} key={input.id}>
                                    <label htmlFor="" className={cx('label')}>
                                        {input.label}
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        id={input.id}
                                        type={input.type}
                                        className={cx('input')}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            );
                        })}
                        <div className={cx('form-input')}>
                            <label className={cx('label')}>Rooms</label>
                            <textarea
                                className={cx('input')}
                                onChange={(e) => setRooms(e.target.value)}
                                placeholder="give comma between room numbers."
                            />
                        </div>
                        <div className={cx('form-input')}>
                            <label className={cx('label')}>Choose A Hotel</label>
                            <select className={cx('select')} id="idHotel" onChange={(e) => setHotel(e.target.value)}>
                                {hotelsData.map((hotel) => (
                                    <option key={hotel._id} value={hotel._id}>
                                        {hotel.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('form-btn')}>
                            <button onClick={handleSubmit} className={cx('btn')}>
                                Add New
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRoom;
