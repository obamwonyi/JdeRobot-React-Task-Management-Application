import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import addTaskStyles from "./AddTask.module.css";
import DropDownButton from "../DropDownButton/DropDownButton";
import DatePicker from "../DatePicker/DatePicker";
import { ReactComponent as Asterisk } from "../../assets/icons/asterisk.svg";
import { addTask } from "../../store/tasks/taskActions";

const API_BASE_URL = 'http://localhost:8000/api';

export default function AddTask() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.tasks);
    const { token } = useSelector((state) => state.auth);

    const [titleValue, setTitleValue] = useState("");
    const [taskValue, setTaskValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState("low");
    const [selectedDate, setSelectedDate] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const priorities = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ];

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/categories/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(response.data.results);

                // Map API response to dropdown format
                const formattedCategories = response.data.results.map(cat => ({
                    value: cat.id,
                    label: cat.name
                }));


                setCategories(formattedCategories);

                // Set default category to "personal" if it exists
                const personalCategory = response.data.results.find(cat =>
                    cat.name.toLowerCase() === "personal"
                );

                if (personalCategory) {
                    setSelectedCategory(personalCategory.id);
                } else if (response.data.results.length > 0) {
                    // Otherwise use the first category
                    setSelectedCategory(response.data.results[0].id);
                }
            } catch (err) {
                console.error("Failed to fetch categories", err);
                toast.error("Failed to load categories");
                // Fallback to empty array
                setCategories([]);
            } finally {
                setCategoriesLoading(false);
            }
        };

        if (token) {
            fetchCategories();
        }
    }, [token]);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: "transparent",
            border: `1px solid var(--primary-text-color-hover)`,
            borderRadius: "4px",
            width: "100%",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "rgba(var(--primary-text-color), 0.2)"
                : "transparent",
            "&:hover": {
                backgroundColor: "rgba(var(--primary-text-color), 0.1)",
            },
        }),
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleCategorySelect = (selectedOption) => {
        setSelectedCategory(selectedOption.value);
    };

    const handlePrioritySelect = (selectedOption) => {
        setSelectedPriority(selectedOption.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titleValue || !taskValue) {
            toast.error("Title and Description are required!");
            return;
        }

        const taskData = {
            title: titleValue,
            description: taskValue,
            category_id: selectedCategory, // Use category_id for the backend, normal name link up not working
            priority: selectedPriority,
            due_date: selectedDate || null, // Ensure null if empty
        };

        try {
            // Log the data being sent for debugging
            console.log("Sending task data:", taskData);

            // Dispatch the addTask action and wait for it to complete
            const result = await dispatch(addTask(taskData));

            if (result) {
                toast.success("Task created successfully!");

                // Clear the form
                setTitleValue("");
                setTaskValue("");
                // Don't reset category as we want to keep the default
                setSelectedPriority("low");
                setSelectedDate("");
            }
        } catch (err) {
            // Log the error details for debugging
            console.error("Error creating task:", err);

            // If there's an error, show an error toast
            toast.error(error || "Failed to create task.");
        }
    };

    // Find the default category and priority objects for the dropdown
    const defaultCategory = categories.find(cat => cat.value === selectedCategory) || null;
    const defaultPriority = priorities.find(p => p.value === selectedPriority) || priorities[0];

    return (
        <div className={addTaskStyles.container}>
            <div className={addTaskStyles.leftDiv}>
                <div className={addTaskStyles.inputDiv}>
                    <label className={addTaskStyles.label} htmlFor="title">
                        Title <Asterisk className={addTaskStyles.asterisk} />
                    </label>
                    <input
                        className={addTaskStyles.title}
                        type="text"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                    />
                </div>

                <div className={addTaskStyles.inputDiv}>
                    <label className={addTaskStyles.label} htmlFor="title">
                        Description <Asterisk className={addTaskStyles.asterisk} />
                    </label>
                    <textarea
                        className={addTaskStyles.task}
                        value={taskValue}
                        onChange={(e) => setTaskValue(e.target.value)}
                    ></textarea>
                </div>

                <div className={addTaskStyles.categoryAndPriorityDiv}>
                    <div className={addTaskStyles.inputDiv}>
                        <label className={addTaskStyles.label} htmlFor="title">
                            Category
                        </label>
                        <DropDownButton
                            options={categories}
                            styles={customStyles}
                            defaultValue={defaultCategory}
                            onChange={handleCategorySelect}
                            isLoading={categoriesLoading}
                            isDisabled={categoriesLoading || categories.length === 0}
                        />
                    </div>

                    <div className={addTaskStyles.inputDiv}>
                        <label className={addTaskStyles.label} htmlFor="title">
                            Priority
                        </label>
                        <DropDownButton
                            options={priorities}
                            styles={customStyles}
                            defaultValue={defaultPriority}
                            onChange={handlePrioritySelect}
                        />
                    </div>
                </div>
            </div>

            <div className={addTaskStyles.rightDiv}>
                <DatePicker onDateSelect={handleDateSelect} />

                <div className={addTaskStyles.buttonDiv}>
                    <button
                        className={addTaskStyles.addTaskButton}
                        onClick={handleSubmit}
                        disabled={loading || categoriesLoading} // Disable button while loading
                    >
                        {loading ? "Adding..." : "Add Task"}
                    </button>
                </div>
            </div>
        </div>
    );
}