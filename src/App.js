import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import store from './store';
import { fetchUserProfile } from './store/auth/authActions';
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from "./components/NotFound/NotFound";
import TaskView from "./components/TaskView/TaskView";

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
                    {/* Add ToastContainer here */}
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
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
                            <Route path="/tasks/:id" element={<TaskView />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;