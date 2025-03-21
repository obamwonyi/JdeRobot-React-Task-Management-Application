import React, { useState } from 'react';
import CreateTaskHeader from '../components/CreateTaskHeader/CreateTaskHeader';
import creatTaskStyle from '../styles/pages/CreateTask.module.css';
import HomeFloatButton from "../components/HomeFloatButton/HomeFloatButton";

import AddTask from '../components/AddTask/AddTask';
import TaskList from '../components/TaskList/TaskList';
import FAQ from '../components/FAQ/FAQ';

export default function CreateTask() {
    const [activeComponent, setActiveComponent] = useState('AddTask');

    const handleNavigate = (component) => {
        setActiveComponent(component);
    };



    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', description: 'Description for Task 1' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2' },
        { id: 3, title: 'Task 3', description: 'Description for Task 3' },
        { id: 4, title: 'Task 4', description: 'Description for Task 4' },
    ]);

    const handleSaveOrder = (newOrderedTasks) => {
        // Update local state
        setTasks(newOrderedTasks);
        // Todo:
        //------------------------------------
        // Send the new order to the backend
        // Sample I can use :
        // fetch('/api/tasks/reorder', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ tasks: newOrderedTasks }),
        // });
    };


    return (
        <div className={creatTaskStyle.container}>

            <HomeFloatButton />

            <CreateTaskHeader
                onNavigate={handleNavigate}
                activeComponent={activeComponent}
            />


            <div className={creatTaskStyle.activityDiv}>
                {activeComponent === 'AddTask' && <AddTask />}
                {activeComponent === 'TaskList' && <TaskList tasks={tasks} />}
                {activeComponent === 'FAQ' && <FAQ />}
            </div>
        </div>
    );
}