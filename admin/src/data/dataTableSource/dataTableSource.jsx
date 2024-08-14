import classNames from 'classnames/bind';

import styles from './dataTableSource.module.scss';

const cx = classNames.bind(styles);
export const userColumns = [
    {
        field: '_id',
        headerName: 'ID',
        width: 250,
    },
    {
        field: 'user',
        headerName: 'User',
        width: 200,
        renderCell: (params) => {
            return (
                <div className={cx('cell-width')}>
                    <img
                        className={cx('cell-img')}
                        src={params.row.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                        alt="avatar"
                    />
                    {params.row.userName}
                </div>
            );
        },
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
    },

    {
        field: 'country',
        headerName: 'Country',
        width: 100,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 100,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        width: 100,
    },
];

export const hotelColumns = [
    { field: '_id', headerName: 'ID', width: 300 },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 100,
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 100,
    },
];

export const roomColumns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 300,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 100,
    },
    {
        field: 'maxPeople',
        headerName: 'Max People',
        width: 100,
    },
];
