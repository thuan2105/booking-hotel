import classNames from 'classnames/bind';

import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
const Modal = ({ openModal, handleClose, handleSubmit, content }) => {
    return (
        <div className={cx('modal')}>
            <div className={cx('overlay')}></div>
            <div className={cx('modal-dialog', 'modal-confirm')}>
                <div className={cx('modal-content', openModal ? 'modal-enter' : 'modal-exit')}>
                    <div className={cx('modal-header')}>
                        <div className={cx('icon-box')}>
                            <FontAwesomeIcon
                                className={cx('icon', `${content.icon.iconColor}`)}
                                icon={content.icon.name}
                            />
                        </div>
                        <h4 className={cx('modal-title')}>{content.title}</h4>
                        <button
                            onClick={handleClose}
                            type="button"
                            className={cx('close')}
                            data-dismiss="modal"
                            aria-hidden="true"
                        >
                            &times;
                        </button>
                    </div>
                    <div className={cx('modal-body')}>
                        <p>{content.description}</p>
                    </div>
                    <div className={cx('modal-footer')}>
                        {content.buttons.map((button) => (
                            <button
                                onClick={button[0] ? handleClose : handleSubmit}
                                type="button"
                                className={cx('btn-modal', `${button.styles}`)}
                                data-dismiss="modal"
                            >
                                {button.name}
                            </button>
                        ))}
                        {/* <button
                            onClick={handleClose}
                            type="button"
                            className={cx('btn-modal', 'btn-info')}
                            data-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSubmit} type="button" className={cx('btn-modal', 'btn-danger')}>
                            Delete
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
