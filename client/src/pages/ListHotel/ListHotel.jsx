import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './ListHotel.module.scss';
import Header from '~/layout/components/Header';
import Navbar from '~/layout/components/Navbar';
import SearchList from '~/layout/components/SearchList';
import ResultList from '~/layout/components/ResultList';
import * as hotelService from '~/services/hotelService';
import { SearchContext } from '~/contexts/SearchContext';

import useDebounce from '~/components/hooks/useDebounce';

const cx = classNames.bind(styles);

const ListHotel = () => {
    const { city } = useContext(SearchContext);
    const location = useLocation();
    const [result, setResult] = useState([]);
    // eslint-disable-next-line
    const [destination, setDestination] = useState(city || location.state.destination);
    const [searchValue, setSearchValue] = useState({ city: destination });
    const debouncedValue = useDebounce(searchValue, 1000);
    // console.log(debouncedValue);
    const [loading, setLoading] = useState(false);
    const dataInput = (searchValue) => {
        setSearchValue(searchValue);
    };
    useEffect(() => {
        const fetchAPI = async () => {
            setLoading(true);
            const result = await hotelService.search(debouncedValue);
            if (result.success) setResult(result.data);
            setLoading(false);
        };
        fetchAPI();
        // eslint-disable-next-line
    }, [debouncedValue]);
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className={cx('body')}>
                <div className={cx('wrapper')}>
                    <SearchList dataInput={dataInput} />
                    {result.length === 0 && !loading ? (
                        <span className={cx('title-result')}>Hotel not found!</span>
                    ) : loading ? (
                        <span className={cx('loader')}></span>
                    ) : (
                        <ResultList result={result} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListHotel;
