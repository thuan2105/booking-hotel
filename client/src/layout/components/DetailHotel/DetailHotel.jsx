import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as hotelService from '~/services/hotelService';
import styles from './DetailHotel.module.scss';
import Button from '~/components/Button';

import { useContext } from 'react';
import { SearchContext } from '~/contexts/SearchContext';
import { AuthContext } from '~/contexts/AuthContext';
import Reserve from '~/components/Reserve';

const cx = classNames.bind(styles);

const DetailHotel = ({ idHotel }) => {
    const photos = [
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
        },
    ];

    const [imgNumber, setImgNumber] = useState(0);
    const [openImg, setOpenImg] = useState(false);
    const [openModal, setOpenModel] = useState(false);

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const handleOpenImg = (index) => {
        setOpenImg(true);
        setImgNumber(index);

        document.body.style.overflow = 'hidden';
    };

    const handleMove = (direction) => {
        let newImgNumber;

        if (direction === 'left') {
            newImgNumber = imgNumber === 0 ? 5 : imgNumber - 1;
        } else if (direction === 'right') {
            newImgNumber = imgNumber === 5 ? 0 : imgNumber + 1;
        }
        setImgNumber(newImgNumber);
    };

    const handleCloseSlider = () => {
        setOpenImg(false);
        document.body.style.overflow = 'scroll';
    };

    const handleSubmit = () => {
        if (user) {
            setOpenModel(true);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        const handleEsc = (event) => {
            event.key === 'Escape' && setOpenImg(false);
            document.body.style.overflow = 'scroll';
        };
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const [data, setData] = useState([]);
    useEffect(() => {
        hotelService
            .getHotel({ idHotel })
            .then((res) => res.success && setData(res.hotel))
            .catch((error) => console.log(error));
    }, [idHotel]);

    const { dates, options } = useContext(SearchContext);

    const dayDifference = (endDate, startDate) => {
        const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
        const date2 = new Date(endDate).getTime();
        const date1 = new Date(startDate).getTime();
        const timeDiff = Math.abs(date2 - date1);
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    };
    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    return (
        <div className={cx('container')}>
            {openImg && (
                <div className={cx('slider')}>
                    <FontAwesomeIcon icon={faCircleXmark} className={cx('close')} onClick={handleCloseSlider} />
                    <FontAwesomeIcon
                        icon={faCircleArrowLeft}
                        className={cx('arrow')}
                        onClick={() => handleMove('left')}
                    />
                    <div className={cx('slider-wrapper')}>
                        <img src={photos[imgNumber].src} alt="" className={cx('img')} />
                    </div>
                    <FontAwesomeIcon
                        icon={faCircleArrowRight}
                        className={cx('arrow')}
                        onClick={() => handleMove('right')}
                    />
                </div>
            )}
            <div className={cx('wrapper')}>
                <Button onClick={handleSubmit} className={cx('btn')} primary>
                    Reserve or Book Now!
                </Button>
                <h1 className={cx('title')}>{data.name}</h1>
                <div className={cx('address')}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{data.address}</span>
                </div>
                <span className={cx('distance')}>Excellent location – {data.distance}m from center</span>
                <span className={cx('price-hight-light')}>
                    Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                </span>
                <div className={cx('images')}>
                    {photos.map((photo, index) => (
                        <div key={index} className={cx('img-wrapper')}>
                            <img onClick={() => handleOpenImg(index)} src={photo.src} alt="" className={cx('img')} />
                        </div>
                    ))}
                </div>
                <div className={cx('details')}>
                    <div className={cx('texts')}>
                        <h1 className={cx('title')}>{data.title}</h1>
                        <p className={cx('description')}>{data.description}</p>
                    </div>
                    <div className={cx('price')}>
                        <h1>Perfect for a {days}-night stay!</h1>
                        <span>
                            Located in the real heart of Krakow, this property has an excellent location score of 9.8!
                        </span>
                        <h2>
                            ${days * data.cheapestPrice * options.room} ({days} nights)
                        </h2>

                        <Button onClick={handleSubmit} primary>
                            Reserve or Book Now!
                        </Button>
                    </div>
                </div>
            </div>
            {openModal && <Reserve setOpen={setOpenModel} hotelData={data} />}
        </div>
    );
};

export default DetailHotel;
