import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import { DarkModeContextProvider } from './contexts/darkMode/darkModeContext';
import { AuthContextProvider } from './contexts/authContext/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <DarkModeContextProvider>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </DarkModeContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
);
