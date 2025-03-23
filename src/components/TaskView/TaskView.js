import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import taskViewStyling from "./TaskView.module.css";
import DropDownButton from "../DropDownButton/DropDownButton";
import DatePicker from "../DatePicker/DatePicker";
import { ReactComponent as Asterisk } from "../../assets/icons/asterisk.svg";
import {
    fetchTasks,
    updateTask,
    deleteTask,
} from "../../store/tasks/taskActions";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api';

export default function TaskView() {
    const { id } = useParams(); // Get the task ID from the URL
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "low",
        category: null, // Store the selected category object
        dueDate: "",
        completed: false,
        order: 0, // Include the order field
    });
    const [initialTask, setInitialTask] = useState(null); // Store initial task state
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch(); // Add useDispatch

    const priorities = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ];

    // Fetch task details and categories when the component mounts
    useEffect(() => {
        const fetchTaskAndCategories = async () => {
            try {
                // Fetch task details
                const taskResponse = await axios.get(`${API_BASE_URL}/tasks/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const taskData = {
                    ...taskResponse.data,
                    dueDate: taskResponse.data.due_date || "", // Map due_date to dueDate
                    category: taskResponse.data.category ? {
                        value: taskResponse.data.category.id,
                        label: taskResponse.data.category.name,
                    } : null,
                };
                setTask(taskData);
                setInitialTask(taskData); // Store initial task state

                // Fetch categories
                const categoriesResponse = await axios.get(`${API_BASE_URL}/categories/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const formattedCategories = categoriesResponse.data.results.map(cat => ({
                    value: cat.id,
                    label: cat.name,
                }));
                setCategories(formattedCategories);

                setCategoriesLoading(false);
                setLoading(false);
            } catch (error) {
                // console.error("Error fetching task or categories:", error);
                toast.error("Failed to load task details.");
                navigate("/tasks");
            }
        };

        if (token) {
            fetchTaskAndCategories();
        } else {
            toast.error("You must be logged in to view this task.");
            navigate("/login");
        }
    }, [id, navigate, token]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({
            ...task,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle category selection
    const handleCategorySelect = (selectedOption) => {
        setTask({
            ...task,
            category: selectedOption,
        });
    };

    // Handle priority selection
    const handlePrioritySelect = (selectedOption) => {
        setTask({
            ...task,
            priority: selectedOption.value,
        });
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        setTask({
            ...task,
            dueDate: date, // Directly use the date string (or null)
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Compare current task state with initial task state
        if (JSON.stringify(task) === JSON.stringify(initialTask)) {
            toast.info("No changes detected. The task was not updated.");
            return;
        }

        try {
            // Prepare the payload with the correct field names and data types
            const taskData = {
                title: task.title,
                description: task.description,
                priority: task.priority,
                completed: task.completed,
                category_id: task.category ? task.category.value : null, // Use category_id for updates
                due_date: task.dueDate || null, // Ensure due_date is null if not set
                order: task.order,
            };

            // console.log("Task data being sent (handleSubmit):", taskData); // Log the payload

            // Dispatch the updateTask action
            await dispatch(updateTask(id, taskData));

            toast.success("Task updated successfully!");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Failed to update task.");
        }
    };

    // Handle task deletion
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                // Dispatch the deleteTask action
                await dispatch(deleteTask(id));

                toast.success("Task deleted successfully!");
                navigate("/dashboard");
            } catch (error) {
                // console.error("Error deleting task:", error);
                toast.error("Failed to delete task.");
            }
        }
    };

    // Handle marking the task as completed
    const handleMarkAsCompleted = async () => {
        try {
            const updatedTask = { ...task, completed: true }; // Set completed to true

            // Prepare the payload with the correct field names and data types
            const taskData = {
                title: updatedTask.title,
                description: updatedTask.description,
                priority: updatedTask.priority,
                completed: updatedTask.completed,
                category: updatedTask.category ? { name: updatedTask.category.label } : null, // Map category to the expected format
                category_id: updatedTask.category ? updatedTask.category.value : null, // Include category_id
                due_date: updatedTask.dueDate || null, // Ensure due_date is null if not set
                order: updatedTask.order, // Include the order field
            };

            // console.log("Task data being sent:", taskData);

            // Dispatch the updateTask action
            await dispatch(updateTask(id, taskData));

            // Update the local state to reflect the change
            setTask(updatedTask);
            toast.success("Task marked as completed!");
            navigate("/dashboard");
        } catch (error) {
            // console.error("Error marking task as completed:", error);
            toast.error("Failed to mark task as completed.");
        }
    };

    if (loading) {
        return <div className={taskViewStyling.loading}>Loading task details...</div>;
    }

    // Find the default category and priority objects for the dropdown
    const defaultCategory = categories.find(cat => cat.value === task.category?.value) || null;
    const defaultPriority = priorities.find(p => p.value === task.priority) || priorities[0];

    return (
        <div className={taskViewStyling.container}>
            <div className={taskViewStyling.innerContainer}>
                <div className={taskViewStyling.leftDiv}>
                    <div className={taskViewStyling.inputDiv}>
                        <label className={taskViewStyling.label} htmlFor="title">
                            Title <Asterisk className={taskViewStyling.asterisk}/>
                        </label>
                        <input
                            className={taskViewStyling.title}
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={taskViewStyling.inputDiv}>
                        <label className={taskViewStyling.label} htmlFor="description">
                            Description <Asterisk className={taskViewStyling.asterisk}/>
                        </label>
                        <textarea
                            className={taskViewStyling.task}
                            name="description"
                            value={task.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={taskViewStyling.categoryAndPriorityDiv}>
                        <div className={taskViewStyling.inputDiv}>
                            <label className={taskViewStyling.label} htmlFor="category">
                                Category
                            </label>
                            <DropDownButton
                                options={categories}
                                defaultValue={defaultCategory}
                                onChange={handleCategorySelect}
                                isLoading={categoriesLoading}
                                isDisabled={categoriesLoading || categories.length === 0}
                            />
                        </div>

                        <div className={taskViewStyling.inputDiv}>
                            <label className={taskViewStyling.label} htmlFor="priority">
                                Priority
                            </label>
                            <DropDownButton
                                options={priorities}
                                defaultValue={defaultPriority}
                                onChange={handlePrioritySelect}
                            />
                        </div>
                    </div>
                </div>

                <div className={taskViewStyling.rightDiv}>
                    <DatePicker onDateSelect={handleDateSelect} selectedDate={task.dueDate}/>

                    <div className={taskViewStyling.buttonDiv}>
                        <button
                            className={taskViewStyling.addTaskButton}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Task"}
                        </button>
                        <button
                            className={taskViewStyling.deleteButton}
                            onClick={handleDelete}
                        >
                            Delete Task
                        </button>
                        {!task.completed && ( // Only show the button if the task is not already completed
                            <button
                                className={taskViewStyling.addTaskButton}
                                onClick={handleMarkAsCompleted}
                            >
                                Mark as Completed
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}