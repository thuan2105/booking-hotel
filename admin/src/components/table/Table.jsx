import classNames from 'classnames/bind';
import {
    Table as TableMaterial,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

import styles from './Table.module.scss';

const cx = classNames.bind(styles);

const Table = () => {
    const rows = [
        {
            id: 1143155,
            product: 'Acer Nitro 5',
            img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',
            customer: 'John Smith',
            date: '1 March',
            amount: 785,
            method: 'Cash on Delivery',
            status: 'Approved',
        },
        {
            id: 2235235,
            product: 'Playstation 5',
            img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg',
            customer: 'Michael Doe',
            date: '1 March',
            amount: 900,
            method: 'Online Payment',
            status: 'Pending',
        },
        {
            id: 2342353,
            product: 'Redragon S101',
            img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg',
            customer: 'John Smith',
            date: '1 March',
            amount: 35,
            method: 'Cash on Delivery',
            status: 'Pending',
        },
        {
            id: 2357741,
            product: 'Razer Blade 15',
            img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg',
            customer: 'Jane Smith',
            date: '1 March',
            amount: 920,
            method: 'Online',
            status: 'Approved',
        },
        {
            id: 2342355,
            product: 'ASUS ROG Strix',
            img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg',
            customer: 'Harold Carol',
            date: '1 March',
            amount: 2000,
            method: 'Online',
            status: 'Pending',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <TableContainer component={Paper} className={cx('table', 'table-mode')}>
                <TableMaterial sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={cx('table-cell', 'table-mode-cell')}>Tracking ID</TableCell>
                            <TableCell className={cx('table-cell', 'table-mode-cell')}>Product</TableCell>
                            <TableCell className={cx('table-cell', 'table-mode-cell')}>Customer</TableCell>
                            <TableCell className={cx('table-cell', 'table-mode-cell')}>Date</TableCell>
                            <TableCell className={cx('table-cell', 'table-mode-cell')}>Amount</TableCell>
                            <TableCell className={cx('table-cell', 'table-mode-cell')}>Payment method</TableCell>
                            <TableCell className={cx('table-cell', 'table-mode-cell')}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" className={cx('table-cell', 'table-mode-cell')}>
                                    {row.id}
                                </TableCell>
                                <TableCell className={cx('table-cell', 'table-mode-cell')}>
                                    <div className={cx('cell-wrapper')}>
                                        <img src={row.img} alt="" className={cx('image')} />
                                        {row.product}
                                    </div>
                                </TableCell>
                                <TableCell className={cx('table-cell', 'table-mode-cell')}>{row.customer}</TableCell>
                                <TableCell className={cx('table-cell', 'table-mode-cell')}>{row.date}</TableCell>
                                <TableCell className={cx('table-cell', 'table-mode-cell')}>{row.amount}</TableCell>
                                <TableCell className={cx('table-cell', 'table-mode-cell')}>{row.method}</TableCell>
                                <TableCell className={cx('table-cell', 'table-mode-cell')}>
                                    <span className={cx('status', `${row.status}`)}>{row.status}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableMaterial>
            </TableContainer>
        </div>
    );
};

export default Table;
