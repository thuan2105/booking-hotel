import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import Button from '~/components/Button';
import styles from './SearchHeader.module.scss';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '~/contexts/SearchContext';
import { NEW_SEARCH } from '~/utils/constants';
import Overlay from '~/components/Overlay';

const cx = classNames.bind(styles);

const SearchHeader = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);

    const [showOverlay, setShowOverlay] = useState(false);
    const [destination, setDestination] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const isDisable = !destination.trim();

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return { ...prev, [name]: operation === 'increase' ? options[name] + 1 : options[name] - 1 };
        });
    };

    const handleSearch = () => {
        dispatch({ type: NEW_SEARCH, payload: { destination, dates, options } });
        navigate('/hotels', {
            state: {
                destination,
                dates,
                options,
            },
        });
    };
    const handleOpenDate = () => {
        setShowOverlay(!showOverlay);
        setOpenDate(!openDate);
    };
    const handleShowOption = () => {
        setShowOverlay(!showOverlay);
        setOpenOptions(!openOptions);
    };
    const handleOverlay = () => {
        setShowOverlay(!showOverlay);
        setOpenOptions(false);
        setOpenDate(false);
    };

    return (
        <>
            <Overlay onClick={handleOverlay} show={showOverlay} />
            <div className={cx('search')}>
                <div className={cx('search-item')}>
                    <FontAwesomeIcon icon={faBed} className={cx('icon')} />
                    <input
                        type="text"
                        placeholder="Where are you going?"
                        className={cx('search-input')}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <div className={cx('search-item')}>
                    <FontAwesomeIcon icon={faCalendarDays} className={cx('icon')} />
                    <span onClick={handleOpenDate} className={cx('search-text')}>{`${format(
                        dates[0].startDate,
                        'dd/MM/yyyy',
                    )} to ${format(dates[0].endDate, 'dd/MM/yyyy')}`}</span>
                    {openDate && (
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            minDate={new Date()}
                            className={cx('date')}
                        />
                    )}
                </div>
                <div className={cx('search-item')}>
                    <FontAwesomeIcon icon={faPerson} className={cx('icon')} />
                    <span
                        className={cx('search-text')}
                        onClick={handleShowOption}
                    >{`${options.adult} adults - ${options.children} children - ${options.room} room`}</span>
                    {openOptions && (
                        <div className={cx('option')}>
                            <div className={cx('option-item')}>
                                <span className={cx('option-text')}>Adult</span>
                                <div className={cx('optionCounter')}>
                                    <button
                                        disabled={options.adult <= 1}
                                        className={cx('option-btn')}
                                        onClick={() => handleOption('adult', 'decrease')}
                                    >
                                        -
                                    </button>
                                    <span className={cx('option-number')}>{options.adult}</span>
                                    <button
                                        className={cx('option-btn')}
                                        onClick={() => handleOption('adult', 'increase')}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className={cx('option-item')}>
                                <span className={cx('option-text')}>Children</span>
                                <div className={cx('optionCounter')}>
                                    <button
                                        disabled={options.children <= 0}
                                        className={cx('option-btn')}
                                        onClick={() => handleOption('children', 'decrease')}
                                    >
                                        -
                                    </button>
                                    <span className={cx('option-number')}>{options.children}</span>
                                    <button
                                        className={cx('option-btn')}
                                        onClick={() => handleOption('children', 'increase')}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className={cx('option-item')}>
                                <span className={cx('option-text')}>Room</span>
                                <div className={cx('optionCounter')}>
                                    <button
                                        disabled={options.room <= 1}
                                        className={cx('option-btn')}
                                        onClick={() => handleOption('room', 'decrease')}
                                    >
                                        -
                                    </button>
                                    <span className={cx('option-number')}>{options.room}</span>
                                    <button
                                        className={cx('option-btn')}
                                        onClick={() => handleOption('room', 'increase')}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx('search-item')}>
                    <Button disabled={isDisable} small primary className={cx('btn')} onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SearchHeader;
