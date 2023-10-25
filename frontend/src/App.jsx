import './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header/Header';
import Register from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import WorkersPage from './pages/WorkersPage/WorkersPage';

function App() {
    return (
        <div className='App'>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<Register />} />
                    <Route
                        path='/jobs'
                        element={
                            <PrivateRoute>
                                <JobsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/workers'
                        element={
                            <PrivateRoute>
                                <WorkersPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path='*' element={<h1>404</h1>} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
