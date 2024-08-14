import classNames from 'classnames/bind';
import { useEffect, useState, useRef, useContext } from 'react';
import { DateRange } from 'react-date-range';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'react-date-range/dist/styles.css';

import 'react-date-range/dist/theme/default.css';
import styles from './SearchList.module.scss';
import Button from '~/components/Button';
import { SearchContext } from '~/contexts/SearchContext';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { NEW_SEARCH } from '~/utils/constants';

const cx = classNames.bind(styles);
const SearchList = ({ dataInput }) => {
    const { dispatch } = useContext(SearchContext);
    const location = useLocation();
    // eslint-disable-next-line
    const [options, setOptions] = useState(location.state.options);
    // eslint-disable-next-line
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const [visible, setVisible] = useState(false);
    const showDate = () => setVisible(true);
    const hideDate = () => setVisible(false);

    const destinationRef = useRef();
    const maxRef = useRef();
    // console.log(maxRef.current.value);
    const minRef = useRef();
    const searchValue = {
        city: destination,
        min: min || 0,
        max: max || 999,
    };

    useEffect(() => {
        (destinationRef.current.value || minRef.current.value || maxRef.current.value) && dataInput(searchValue);
        // eslint-disable-next-line
    }, [destination, min, max]);
    const handleChangeOption = (e) => {
        setOptions((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSearch = () => {
        dispatch({ type: NEW_SEARCH, payload: { destination, dates, options } });
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Search</h1>

            <div className={cx('item')}>
                <label>Destination</label>
                <input
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder={destination}
                    type="text"
                    ref={destinationRef}
                />
            </div>
            <div className={cx('item')}>
                <label>Check-in Date</label>
                <Tippy
                    onClickOutside={hideDate}
                    theme={'light'}
                    visible={visible}
                    offset={[150, 5]}
                    placement="right"
                    interactive={true}
                    content={
                        <DateRange
                            onChange={(item) => {
                                setDates([item.selection]);
                            }}
                            ranges={dates}
                            minDate={new Date()}
                        />
                    }
                >
                    <span onClick={() => (!visible ? showDate() : hideDate())}>{`${format(
                        dates[0].startDate,
                        'dd/MM/yyyy',
                    )} to ${format(dates[0].endDate, 'dd/MM/yyyy')}`}</span>
                </Tippy>
            </div>
            <div className={cx('item')}>
                <label>Options</label>
                <div className={cx('list-options')}>
                    <div className={cx('option-item')}>
                        <label className={cx('option-text')}>
                            Min-price <small>per night</small>
                        </label>
                        <input
                            type="number"
                            onChange={(e) => setMin(e.target.value)}
                            className={cx('option-input')}
                            value={min}
                            ref={minRef}
                            min={0}
                        />
                    </div>
                    <div className={cx('option-item')}>
                        <label className={cx('option-text')}>
                            Max price <small>per night</small>
                        </label>
                        <input
                            value={max}
                            ref={maxRef}
                            type="number"
                            onChange={(e) => setMax(e.target.value)}
                            className={cx('option-input')}
                            min={0}
                        />
                    </div>

                    <div className={cx('option-item')}>
                        <label className={cx('option-text')}>Adult</label>

                        <input
                            onChange={handleChangeOption}
                            type="number"
                            min={1}
                            name="adult"
                            className={cx('option-input')}
                            placeholder={1 || options.adult}
                        />
                    </div>
                    <div className={cx('option-item')}>
                        <label className={cx('option-text')}>Children</label>
                        <input
                            type="number"
                            min={0}
                            name="children"
                            onChange={handleChangeOption}
                            className={cx('option-input')}
                            placeholder={0 || options.children}
                        />
                    </div>
                    <div className={cx('option-item')}>
                        <label className={cx('option-text')}>Room</label>
                        <input
                            onChange={handleChangeOption}
                            type="number"
                            min={1}
                            name="room"
                            className={cx('option-input')}
                            placeholder={1 || options.room}
                        />
                    </div>
                </div>
            </div>

            <Button onClick={handleSearch} className={cx('search-btn')} primary>
                Confirm
            </Button>
            <span className={cx('description-btn')}>
                Click the "confirm" button once you have changed the date and options.
            </span>
        </div>
    );
};

export default SearchList;
