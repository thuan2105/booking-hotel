import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { publicRoute, privateRouter } from './routes';
import { Fragment, useContext } from 'react';
import DefaultLayout from './layouts/defaultLayout/DefaultLayout';
import { AuthContext } from './contexts/authContext/AuthContext';
function App() {
    const { user } = useContext(AuthContext);
    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }
        return children;
    };
    return (
        <Router>
            <Routes>
                {publicRoute.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    let props = {};

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    if (route.props) props = route.props;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page props={props} />
                                </Layout>
                            }
                        />
                    );
                })}
                {privateRouter.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    let props = {};

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    if (route.props) props = route.props;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <Page props={props} />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
