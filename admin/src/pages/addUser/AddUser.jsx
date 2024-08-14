import classNames from 'classnames/bind';
import { useState } from 'react';
import { DriveFolderUploadOutlined } from '@mui/icons-material';

import * as uploadFileService from '~/services/uploadFileService';
import * as accountService from '~/services/accountService';

import styles from './AddUser.module.scss';
import { userInputs } from '~/formSource/formSource';

const cx = classNames.bind(styles);

const AddUser = () => {
    const [file, setFile] = useState('');
    const [info, setInfo] = useState({});
    const handleChange = (e) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'upload');

        uploadFileService
            .uploadFile(data)
            .then((data) =>
                setInfo({
                    ...info,
                    img: data.url,
                }),
            )
            .catch((err) => console.log(err));
        console.log(info);
        accountService
            .newUser(info)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-top')}>
                <h1 className={cx('title')}>Add new user</h1>
            </div>
            <div className={cx('wrapper-bottom')}>
                <div className={cx('wrapper-left')}>
                    <img
                        className={cx('img')}
                        src={
                            file
                                ? URL.createObjectURL(file)
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
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{
                                    display: 'none',
                                }}
                            />
                        </div>

                        {userInputs.map((input) => {
                            return (
                                <div className={cx('form-input')} key={input.id}>
                                    <label htmlFor={input.id} className={cx('label')}>
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

export default AddUser;
