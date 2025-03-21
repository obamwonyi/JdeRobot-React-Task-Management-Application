import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Protected routes */}
                        <Route element={<ProtectedRoute />}>
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