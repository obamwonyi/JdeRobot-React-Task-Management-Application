import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import taskTableStyles from './TaskTable.module.css';

export default function TaskTable({ tasks }) {

    return (
        <div className={taskTableStyles.container}>
            {tasks.map((task, index) => (
                <TaskItem key={index} {...task} />
            ))}
        </div>
    );
}