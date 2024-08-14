import classNames from 'classnames/bind';

import styles from './ResultList.module.scss';
import SearchItem from '~/components/SearchItem';

const cx = classNames.bind(styles);

const ResultList = ({ result }) => {
    return (
        <div className={cx('wrapper')}>
            {result.map((item) => (
                <SearchItem item={item} key={item._id} />
            ))}
        </div>
    );
};

export default ResultList;
