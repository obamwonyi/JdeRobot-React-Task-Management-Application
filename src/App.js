import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import store from './store';
import { fetchUserProfile } from './store/auth/authActions';
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';


const InitializeAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // If we have a token in localStorage, try to load the user
        if (localStorage.getItem('token')) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch]);

    return null;
};

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <InitializeAuth />
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Protected routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/create_task" element={<CreateTask />} />
                            <Route path="/about" element={<About />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;