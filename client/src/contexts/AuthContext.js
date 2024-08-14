import { createContext, useReducer } from 'react';

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '~/utils/constants';
const getItemLocalStorage = JSON.parse(localStorage.getItem('loggedIn'));
const INITIAL_STATE = {
    loggedIn: false || getItemLocalStorage.loggedIn,
    user: null || getItemLocalStorage.user,
    isLoading: false,
    error: null,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                user: null,
                isLoading: true,
                error: null,
            };

        case LOGIN_SUCCESS:
            return {
                loggedIn: action.payload.loggedIn,
                user: action.payload.details,
                isLoading: false,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                user: null,
                isLoading: false,
                error: action.payload,
            };

        case LOGOUT:
            return {
                loggedIn: false,
                user: null,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    localStorage.setItem('loggedIn', JSON.stringify({ loggedIn: state.loggedIn, user: state.user }));

    const value = {
        loggedIn: state.loggedIn,
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
