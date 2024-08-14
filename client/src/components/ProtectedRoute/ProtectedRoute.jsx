import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import config from '~/config';
import { AuthContext } from '~/contexts/AuthContext';

const ProtectedRouter = ({ children }) => {
    const { loggedIn } = useContext(AuthContext);
    if (loggedIn) {
        <Navigate to={config.routes.home} />;
    }
    return children;
};

export default ProtectedRouter;
