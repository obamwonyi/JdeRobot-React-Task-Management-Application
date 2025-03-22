import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dashboard from "../styles/pages/Dashboard.module.css";
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import SearchBar from '../components/SearchBar/SearchBar';
import TaskTable from '../components/TaskTable/TaskTable';
import Logout from "../components/Logout/Logout";
import useAuth from '../hooks/useAuth';
import { fetchUserProfile } from '../store/auth/authActions';
import {toast} from "react-toastify";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && !user && !loading) {
            console.log('Dashboard: Attempting to fetch user profile');
            dispatch(fetchUserProfile()).catch(err => {
                console.error('Error fetching user profile:', err);
            });
        }
    }, [isAuthenticated, user, loading, dispatch]);

    const userName = user?.username || 'User';

    // toast.success(`Welcome ${userName}`);


    const tasks = [
    ];

    return (
        <div className={dashboard.container}>
            {/* Header component */}
            <DashboardHeader userName={userName} />

            {/* SearchBar component */}
            <SearchBar />

            {/* TaskTable component */}
            <TaskTable tasks={tasks} />

            <Logout />
        </div>
    );
}