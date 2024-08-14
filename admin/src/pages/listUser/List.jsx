import classNames from 'classnames/bind';

import styles from './List.module.scss';
import DataTable from '~/components/dataTable';

const cx = classNames.bind(styles);
const List = ({ props }) => {
    return (
        <div className={cx('list')}>
            <DataTable columns={props} />
        </div>
    );
};

export default List;
