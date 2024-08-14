import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { DriveFolderUploadOutlined } from '@mui/icons-material';

import styles from './AddHotel.module.scss';
import { hotelInputs } from '~/formSource/formSource';
import * as roomService from '~/services/roomService';
import * as uploadFileService from '~/services/uploadFileService';
import * as hotelService from '~/services/hotelService';

const cx = classNames.bind(styles);

const AddHotel = () => {
    const [files, setFiles] = useState('');
    const [info, setInfo] = useState({});
    const [roomsData, setRoomsData] = useState([]);
    const [rooms, setRooms] = useState([]);
    console.log(roomsData);
    useEffect(() => {
        roomService
            .getAllRooms()
            .then((data) => {
                console.log(data);
                setRoomsData(data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setRooms(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const listPhoto = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append('file', file);
                    data.append('upload_preset', 'upload');
                    const { url } = await uploadFileService.uploadFile(data);
                    return url;
                }),
            );
            const newHotel = { ...info, rooms, photos: listPhoto };
            const data = await hotelService.createHotel(newHotel);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-top')}>
                <h1 className={cx('title')}>Add Hotel New</h1>
            </div>
            <div className={cx('wrapper-bottom')}>
                <div className={cx('wrapper-left')}>
                    <img
                        className={cx('img')}
                        src={
                            files
                                ? URL.createObjectURL(files[0])
                                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                        }
                        alt=""
                    />
                </div>
                <div className={cx('wrapper-right')}>
                    <form className={cx('form')}>
                        <div className={cx('form-input')}>
                            <label htmlFor="file" className={cx('label')}>
                                Image: <DriveFolderUploadOutlined className={cx('icon')} />
                            </label>
                            <input
                                type="file"
                                id="file"
                                multiple
                                onChange={(e) => setFiles(e.target.files)}
                                style={{
                                    display: 'none',
                                }}
                            />
                        </div>

                        {hotelInputs.map((input) => {
                            return (
                                <div className={cx('form-input')} key={input.id}>
                                    <label htmlFor="" className={cx('label')}>
                                        {input.label}
                                    </label>
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        onChange={handleChange}
                                        className={cx('input')}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            );
                        })}
                        <div className={cx('form-input')}>
                            <label htmlFor="" className={cx('label')}>
                                Featured
                            </label>
                            <select className={cx('select')} onChange={handleChange} id="featured">
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                        <div className={cx('select-rooms')}>
                            <label htmlFor="" className={cx('label')}>
                                Rooms
                            </label>
                            <select className={cx('select-room')} multiple onChange={handleSelect} id="rooms">
                                {roomsData.map((room) => (
                                    <option className={cx('select-option')} value={room._id} key={room._id}>
                                        {room.title}
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

export default AddHotel;
