import React from 'react';
import createTaskHeaderStyles from './CreateTaskHeader.module.css';

export default function CreateTaskHeader({ onNavigate, activeComponent }) {
    return (
        <div className={createTaskHeaderStyles.container}>
            {/* Navigation Buttons */}
            <button
                className={`${createTaskHeaderStyles.button} ${
                    activeComponent === 'AddTask' ? createTaskHeaderStyles.active : ''
                }`}
                onClick={() => onNavigate('AddTask')}
            >
                Add Task
            </button>

            <button
                className={`${createTaskHeaderStyles.button} ${
                    activeComponent === 'TaskList' ? createTaskHeaderStyles.active : ''
                }`}
                onClick={() => onNavigate('TaskList')}
            >
                Task List
            </button>

            <button
                className={`${createTaskHeaderStyles.button} ${
                    activeComponent === 'FAQ' ? createTaskHeaderStyles.active : ''
                }`}
                onClick={() => onNavigate('FAQ')}
            >
                FAQ
            </button>
        </div>
    );
}