import { createContext, useEffect, useReducer } from 'react';

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '~/utils/constant/constant';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
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
                user: action.payload,
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

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    const value = { user: state.user, isLoading: state.isLoading, error: state.error, dispatch };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
