import PropTypes from 'prop-types';

import './GlobalStyles.scss';

const GlobalStyle = ({ children }) => {
    return children;
};

GlobalStyle.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyle;
