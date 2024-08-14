import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropsType from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);
const Button = ({
    to,
    href,
    type,
    primary = false,
    active = false,
    text = false,
    outline = false,
    rounded = false,
    disabled = false,
    small = false,
    larger = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) => {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        active,
        text,
        outline,
        rounded,
        disabled,
        small,
        larger,
    });

    return (
        <Component className={classes} {...props} {...passProps}>
            {leftIcon && <span className={cx('icon-left')}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={cx('icon-right')}>{rightIcon}</span>}
        </Component>
    );
};

Button.propsType = {
    to: PropsType.string,
    href: PropsType.string,
    primary: PropsType.bool,
    text: PropsType.bool,
    active: PropsType.bool,
    outline: PropsType.bool,
    rounded: PropsType.bool,
    disabled: PropsType.bool,
    small: PropsType.bool,
    larger: PropsType.bool,
    children: PropsType.node.isRequired,
    className: PropsType.string,
    leftIcon: PropsType.node,
    rightIcon: PropsType.node,
    onClick: PropsType.func,
};

export default Button;
