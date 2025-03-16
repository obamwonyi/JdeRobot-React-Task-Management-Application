import React, { useState } from 'react';
import CreateTaskHeader from '../components/CreateTaskHeader/CreateTaskHeader';
import creatTaskStyle from '../styles/pages/CreateTask.module.css';
import HomeFloatButton from "../components/HomeFloatButton/HomeFloatButton";

import AddTask from '../components/AddTask/AddTask';
import TaskList from '../components/TaskList/TaskList';
import HowTo from '../components/HowTo/HowTo';

export default function CreateTask() {
    const [activeComponent, setActiveComponent] = useState('AddTask');

    const handleNavigate = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className={creatTaskStyle.container}>
            <HomeFloatButton />
            {/* Render the CreateTaskHeader and pass the callback and activeComponent */}
            <CreateTaskHeader
                onNavigate={handleNavigate}
                activeComponent={activeComponent}
            />

            {/* Render the active component */}
            <div className={creatTaskStyle.activityDiv}>
                {activeComponent === 'AddTask' && <AddTask />}
                {activeComponent === 'TaskList' && <TaskList />}
                {activeComponent === 'HowTo' && <HowTo />}
            </div>
        </div>
    );
}