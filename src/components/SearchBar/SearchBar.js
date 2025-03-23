import React, { useState } from 'react';
import searchBarStyles from './SearchBar.module.css';

export default function SearchBar({ onSearch, onFilter }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [statusFilters, setStatusFilters] = useState([]);
    const [priorityFilters, setPriorityFilters] = useState([]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Pass the search term to the parent component
    };

    // Handle category filter change
    const handleCategoryFilterChange = (category) => {
        const updatedFilters = categoryFilters.includes(category)
            ? categoryFilters.filter((cat) => cat !== category) // Remove if already selected
            : [...categoryFilters, category]; // Add if not selected
        setCategoryFilters(updatedFilters);
        onFilter({ category: updatedFilters }); // Pass the updated filters to the parent component
    };

    // Handle status filter change
    const handleStatusFilterChange = (status) => {
        let updatedFilters;

        if (status === 'All') {
            // If "All" is selected, clear other status filters
            updatedFilters = statusFilters.includes('All') ? [] : ['All'];
        } else {
            // If another status is selected, remove "All" if it exists
            updatedFilters = statusFilters.includes(status)
                ? statusFilters.filter((s) => s !== status) // Remove if already selected
                : [...statusFilters.filter((s) => s !== 'All'), status]; // Add if not selected
        }

        setStatusFilters(updatedFilters);
        onFilter({ status: updatedFilters }); // Pass the updated filters to the parent component
    };

    // Handle priority filter change
    const handlePriorityFilterChange = (priority) => {
        const updatedFilters = priorityFilters.includes(priority)
            ? priorityFilters.filter((p) => p !== priority) // Remove if already selected
            : [...priorityFilters, priority]; // Add if not selected
        setPriorityFilters(updatedFilters);
        onFilter({ priority: updatedFilters }); // Pass the updated filters to the parent component
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
                                    type="checkbox"
                                    checked={categoryFilters.includes(category)}
                                    onChange={() => handleCategoryFilterChange(category)}
                                />
                            </div>
                        ))}
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
                                    type="checkbox"
                                    checked={statusFilters.includes(status)}
                                    onChange={() => handleStatusFilterChange(status)}
                                    disabled={status !== 'All' && statusFilters.includes('All')} // Disable if "All" is selected
                                />
                            </div>
                        ))}
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
                                    type="checkbox"
                                    checked={priorityFilters.includes(priority)}
                                    onChange={() => handlePriorityFilterChange(priority)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}