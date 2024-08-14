import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';

import styles from './DataTable.module.scss';
import { Link, useLocation } from 'react-router-dom';
import config from '~/config';
import * as accountService from '~/services/accountService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
const DataTable = ({ columns }) => {
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    const [list, setList] = useState([]);
    useEffect(() => {
        accountService
            .getData(path)
            .then((data) => {
                setList(data.data);
            })
            .catch((error) => console.log(error));
    }, [path]);
    const handleDelete = (id) => {
        accountService
            .deleteUser(id, path)
            .then((data) => data.success && setList(list.filter((item) => item._id !== id)))
            .catch((err) => console.log(err));
    };
    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cell-action')}>
                            <Link to={config.route.detailUser} state={params.row}>
                                <div className={cx('view-btn', 'btn-mode')}>View</div>
                            </Link>
                            <div onClick={() => handleDelete(params.row._id)} className={cx('delete-btn', 'btn-mode')}>
                                Delete
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];
    return (
        <div className={cx('data-table')}>
            <div className={cx('data-table-title')}>
                <Link className={cx('data-table-link', 'data-table-link-mode')} to={'new'}>
                    Add new
                </Link>
            </div>
            <DataGrid
                sx={{
                    '.css-levciy-MuiTablePagination-displayedRows': {
                        fontSize: '1.3rem',
                        color: 'gray',
                    },
                    '.css-i4bv87-MuiSvgIcon-root': {
                        width: '20px',
                        height: '20px',
                        color: 'gray',
                    },
                }}
                className={cx('data-grid', 'data-grid-mode')}
                rows={list}
                columns={columns.concat(actionColumn)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 9 },
                    },
                }}
                pageSizeOptions={[9, 20, 50]}
                checkboxSelection
                getRowId={(row) => row._id}
            />
        </div>
    );
};

export default DataTable;
