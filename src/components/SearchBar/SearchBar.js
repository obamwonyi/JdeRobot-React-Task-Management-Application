import React, { useState } from 'react';
import searchBarStyles from './SearchBar.module.css';

export default function SearchBar({ onSearch, onFilter }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Pass the search term to the parent component
    };

    // Handle category filter change
    const handleCategoryFilterChange = (category) => {
        // If selecting the already selected option, clear it; otherwise set the new selection
        const newValue = category === categoryFilter ? '' : category;
        setCategoryFilter(newValue);
        onFilter({ category: newValue ? [newValue] : [] }); // Pass as array for compatibility
    };

    // Handle status filter change
    const handleStatusFilterChange = (status) => {
        // If selecting the already selected option, clear it; otherwise set the new selection
        const newValue = status === statusFilter ? '' : status;
        setStatusFilter(newValue);
        onFilter({ status: newValue ? [newValue] : [] }); // Pass as array for compatibility
    };

    // Handle priority filter change
    const handlePriorityFilterChange = (priority) => {
        // If selecting the already selected option, clear it; otherwise set the new selection
        const newValue = priority === priorityFilter ? '' : priority;
        setPriorityFilter(newValue);
        onFilter({ priority: newValue ? [newValue] : [] }); // Pass as array for compatibility
    };

    return (
        <div className={searchBarStyles.container}>
            <div className={searchBarStyles.searchAndFilterDiv}>
                {/* Search Input */}
                <div className={searchBarStyles.searchDiv}>
                    <h3 className={searchBarStyles.header}>Search Task By Title</h3>
                    <input
                        className={searchBarStyles.input}
                        value={searchTerm}
                        type="search"
                        placeholder="Search Task Title..."
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Category Filters */}
                <div className={searchBarStyles.filterDiv}>
                    <h3 className={searchBarStyles.header}>Category</h3>
                    <div className={searchBarStyles.checkboxButtonDivContainer}>
                        {['Personal', 'Work', 'Groceries'].map((category) => (
                            <div key={category} className={searchBarStyles.checkboxButtonDiv}>
                                <h6 className={searchBarStyles.checkboxButtonText}>{category}</h6>
                                <input
                                    type="radio"
                                    name="categoryFilter"
                                    checked={categoryFilter === category}
                                    onChange={() => handleCategoryFilterChange(category)}
                                />
                            </div>
                        ))}
                        {categoryFilter && (
                            <div className={searchBarStyles.checkboxButtonDiv}>
                                <h6 className={searchBarStyles.checkboxButtonText}>Clear</h6>
                                <button
                                    className={searchBarStyles.clearButton}
                                    onClick={() => handleCategoryFilterChange(categoryFilter)}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Filters */}
                <div className={searchBarStyles.filterDiv}>
                    <h3 className={searchBarStyles.header}>Status</h3>
                    <div className={searchBarStyles.checkboxButtonDivContainer}>
                        {['All', 'Completed', 'Incomplete'].map((status) => (
                            <div key={status} className={searchBarStyles.checkboxButtonDiv}>
                                <h6 className={searchBarStyles.checkboxButtonText}>{status}</h6>
                                <input
                                    type="radio"
                                    name="statusFilter"
                                    checked={statusFilter === status}
                                    onChange={() => handleStatusFilterChange(status)}
                                />
                            </div>
                        ))}
                        {statusFilter && (
                            <div className={searchBarStyles.checkboxButtonDiv}>
                                <h6 className={searchBarStyles.checkboxButtonText}>Clear</h6>
                                <button
                                    className={searchBarStyles.clearButton}
                                    onClick={() => handleStatusFilterChange(statusFilter)}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Priority Filters */}
                <div className={searchBarStyles.filterDiv}>
                    <h3 className={searchBarStyles.header}>Priority</h3>
                    <div className={searchBarStyles.checkboxButtonDivContainer}>
                        {['High', 'Medium', 'Low'].map((priority) => (
                            <div key={priority} className={searchBarStyles.checkboxButtonDiv}>
                                <h6 className={searchBarStyles.checkboxButtonText}>{priority}</h6>
                                <input
                                    type="radio"
                                    name="priorityFilter"
                                    checked={priorityFilter === priority}
                                    onChange={() => handlePriorityFilterChange(priority)}
                                />
                            </div>
                        ))}
                        {priorityFilter && (
                            <div className={searchBarStyles.checkboxButtonDiv}>
                                <h6 className={searchBarStyles.checkboxButtonText}>Clear</h6>
                                <button
                                    className={searchBarStyles.clearButton}
                                    onClick={() => handlePriorityFilterChange(priorityFilter)}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}