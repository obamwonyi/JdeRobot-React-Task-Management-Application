import React, { useEffect, useState } from 'react';
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
    // console.log('Tasks state:', tasksState);

    // Safely extract tasks with fallback
    const tasks = Array.isArray(tasksState?.tasks) ? tasksState.tasks : [];
    const tasksLoading = tasksState?.loading || false;
    const tasksError = tasksState?.error || null;

    // State for search and filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: [],
        status: [],
        priority: [],
    });

    // Handle search input change
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Handle filter change
    const handleFilter = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };

    // Filter tasks based on search term and filters
    const filteredTasks = tasks.filter((task) => {
        // Filter by search term (title)
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by category - Check both direct category and nested category.name if available
        const taskCategory = typeof task.category === 'string'
            ? task.category
            : task.category?.name || '';

        const matchesCategory =
            filters.category.length === 0 ||
            filters.category.some(cat =>
                taskCategory.toLowerCase() === cat.toLowerCase()
            );

        // Filter by status
        const matchesStatus =
            filters.status.length === 0 || // No status filters selected
            (filters.status.includes('All')) || // "All" is selected
            (filters.status.includes('Completed') && task.completed) || // "Completed" is selected
            (filters.status.includes('Incomplete') && !task.completed); // "Incomplete" is selected

        // Filter by priority - Case insensitive comparison
        const matchesPriority =
            filters.priority.length === 0 ||
            filters.priority.some(p =>
                task.priority.toLowerCase() === p.toLowerCase()
            );

        return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });

    useEffect(() => {
        if (isAuthenticated && !user && !loading) {
            // console.log('Dashboard: Attempting to fetch user profile');
            dispatch(fetchUserProfile()).catch(err => {
                // console.error('Error fetching user profile:', err);
            });
        }
    }, [isAuthenticated, user, loading, dispatch]);

    // Fetch tasks when the component mounts and when authentication status changes
    useEffect(() => {
        if (isAuthenticated) {
            // console.log('Dashboard: Fetching tasks');
            dispatch(fetchTasks())
                .then(response => {
                    // console.log('Tasks fetched successfully:', response);
                })
                .catch(err => {
                    // console.error('Error fetching tasks:', err);
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
            <SearchBar onSearch={handleSearch} onFilter={handleFilter} />

            {/* TaskTable component with loading state and safe tasks handling */}
            {tasksLoading ? (
                <div className={dashboard.loadingContainer}>
                    <p>Loading tasks...</p>
                </div>
            ) : (
                <TaskTable tasks={filteredTasks} />
            )}

            <Logout />
        </div>
    );
}