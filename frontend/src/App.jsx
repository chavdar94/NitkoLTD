import './App.css';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header/Header';
import Register from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import WorkersPage from './pages/WorkersPage/WorkersPage';
import Missing from './components/404/Missing';
import Layout from './utils/Layout';
import RequireAuth from './utils/RequireAuth';
import GuestRoute from './utils/GuestRoute';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Layout />}>
                    {/* public routes */}
                    <Route path='/' element={<HomePage />} />

                    {/* public if not logged in else redirecting to home page */}
                    <Route element={<GuestRoute />}>
                        <Route path='login' element={<LoginPage />} />
                        <Route path='register' element={<Register />} />
                    </Route>

                    {/* private routes */}
                    <Route element={<RequireAuth />}>
                        <Route path='jobs' element={<JobsPage />} />
                        <Route path='workers' element={<WorkersPage />} />
                    </Route>

                    {/* not found */}
                    <Route path='*' element={<Missing />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
