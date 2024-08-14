import { createContext, useReducer } from 'react';

import { NEW_SEARCH, RESET_SEARCH } from '~/utils/constants';

const resultSearch = JSON.parse(localStorage.getItem('resultSearch'));

const INITIAL_STATE = {
    city: resultSearch.destination || undefined,
    dates: resultSearch.dates || [],
    options: {
        adult: resultSearch.options.adult || undefined,
        children: resultSearch.options.children || undefined,
        room: resultSearch.options.room || undefined,
    },
};

const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case NEW_SEARCH: {
            localStorage.setItem('resultSearch', JSON.stringify(action.payload));
            return action.payload;
        }
        case RESET_SEARCH:
            return INITIAL_STATE;
        default:
            return state;
    }
};

const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    const value = { city: state.city, dates: state.dates, options: state.options, dispatch };
    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export { SearchContext, SearchContextProvider };
