import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/GlobalStyles';
import { SearchContextProvider } from './contexts/SearchContext';
import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle>
            <AuthContextProvider>
                <SearchContextProvider>
                    <App />
                </SearchContextProvider>
            </AuthContextProvider>
        </GlobalStyle>
    </React.StrictMode>,
);
