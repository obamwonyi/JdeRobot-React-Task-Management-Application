import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import taskTableStyles from './TaskTable.module.css';
import { Link } from "react-router-dom";

export default function TaskTable({ tasks }) {

    console.log(tasks);

    return (
        <div className={taskTableStyles.container}>
            {tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <TaskItem key={index} {...task} />
                ))
            ) : (
                <div className={taskTableStyles.emptyState}>
                    <p>No tasks available. Create a new task to get started!</p>
                    <Link to="/create_task" className={taskTableStyles.createTaskBtn}>Create New Task</Link>
                </div>
            )}
        </div>
    );
}