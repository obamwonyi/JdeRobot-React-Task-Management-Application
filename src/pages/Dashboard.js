import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dashboard from "../styles/pages/Dashboard.module.css";
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import SearchBar from '../components/SearchBar/SearchBar';
import TaskTable from '../components/TaskTable/TaskTable';
import Logout from "../components/Logout/Logout";
import useAuth from '../hooks/useAuth';
import { fetchUserProfile } from '../store/auth/authActions';
import { fetchTasks } from '../store/tasks/taskActions';
import { toast } from "react-toastify";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useAuth();

    // Get the entire tasks state for debugging
    const tasksState = useSelector(state => state.tasks);
    console.log('Tasks state:', tasksState);

    // Safely extract tasks with fallback
    const tasks = Array.isArray(tasksState?.tasks) ? tasksState.tasks : [];
    const tasksLoading = tasksState?.loading || false;
    const tasksError = tasksState?.error || null;

    console.log('Extracted tasks array:', tasks);
    console.log('Tasks array type:', typeof tasks);
    console.log('Is tasks an array?', Array.isArray(tasks));

    useEffect(() => {
        if (isAuthenticated && !user && !loading) {
            console.log('Dashboard: Attempting to fetch user profile');
            dispatch(fetchUserProfile()).catch(err => {
                console.error('Error fetching user profile:', err);
            });
        }
    }, [isAuthenticated, user, loading, dispatch]);

    // Fetch tasks when the component mounts and when authentication status changes
    useEffect(() => {
        if (isAuthenticated) {
            console.log('Dashboard: Fetching tasks');
            dispatch(fetchTasks())
                .then(response => {
                    console.log('Tasks fetched successfully:', response);
                })
                .catch(err => {
                    console.error('Error fetching tasks:', err);
                    toast.error('Failed to load tasks');
                });
        }
    }, [isAuthenticated, dispatch]);

    // Show error toast if there's an error fetching tasks
    useEffect(() => {
        if (tasksError) {
            toast.error(`Error loading tasks: ${tasksError}`);
        }
    }, [tasksError]);

    const userName = user?.username || 'User';

    return (
        <div className={dashboard.container}>
            {/* Header component */}
            <DashboardHeader userName={userName} />

            {/* SearchBar component */}
            <SearchBar />

            {/* TaskTable component with loading state and safe tasks handling */}
            {tasksLoading ? (
                <div className={dashboard.loadingContainer}>
                    <p>Loading tasks...</p>
                </div>
            ) : (
                <TaskTable tasks={tasks} />
            )}

            <Logout />
        </div>
    );
}