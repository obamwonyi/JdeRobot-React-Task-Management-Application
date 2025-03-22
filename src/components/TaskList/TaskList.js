import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import taskListStyles from "./TaskList.module.css";
import { ReactComponent as Drag } from "../../assets/icons/drag.svg";
import { ReactComponent as Click } from "../../assets/icons/click.svg";
import { ReactComponent as Save } from "../../assets/icons/save.svg";
import SortableTaskItem from "../SortableTaskItem/SortableTaskItem";
import axios from 'axios';

// The base url
const API_BASE_URL = 'http://localhost:8000/api';


export default function TaskList({ onSaveOrder }) {
    const [taskItems, setTaskItems] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);

    // Access tasks from the Redux store
    const tasksState = useSelector((state) => state.tasks);
    const tasks = Array.isArray(tasksState.tasks) ? tasksState.tasks : [];
    const tasksLoading = tasksState.loading || false;
    const tasksError = tasksState.error || null;

    // Update taskItems when tasks change
    useEffect(() => {
        setTaskItems([...tasks]);
    }, [tasks]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Handle drag-and-drop events
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setTaskItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);
                setHasChanged(true);
                return newItems;
            });
        }
    };

    // Handle saving the new order
    const handleSaveOrder = async () => {
        if (!hasChanged) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_BASE_URL}/tasks/bulk_update/`, taskItems, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Task order saved successfully!");
            setHasChanged(false);

            // Notify the parent component (if needed)
            if (onSaveOrder) {
                onSaveOrder(taskItems);
            }
        } catch (err) {
            console.error("Error saving task order:", err);
            toast.error("Failed to save task order.");
        }
    };

    if (tasksLoading) {
        return <div className={taskListStyles.loading}>Loading tasks...</div>;
    }

    if (tasksError) {
        return <div className={taskListStyles.error}>{tasksError}</div>;
    }

    return (
        <div className={taskListStyles.container}>
            <h2 className={taskListStyles.title}>Task List</h2>

            <div className={taskListStyles.innerContainer}>
                <div className={taskListStyles.listInnerDivLeft}>
                    {taskItems.length === 0 ? (
                        <p className={taskListStyles.emptyMessage}>No tasks available</p>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={taskItems.map(task => task.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className={taskListStyles.taskItems}>
                                    {taskItems.map(task => (
                                        <SortableTaskItem key={task.id} task={task} id={task.id} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>

                <div className={taskListStyles.listInnerDivRight}>
                    <ul>
                        <li>
                            <Drag className={taskListStyles.iconStyling} /> Drag The Task Card to re-arrange their positions and order.
                        </li>
                        <li>
                            <Click className={taskListStyles.iconStyling} /> Click the Task Card for full card content and modification.
                        </li>
                        <li>
                            <Save className={taskListStyles.iconStyling} /> Don't forget to click save button to save your new order of arrangement.
                        </li>
                    </ul>

                    <div className={taskListStyles.buttonDiv}>
                        <button
                            className={`${taskListStyles.button} ${!hasChanged ? taskListStyles.buttonActive : ''}`}
                            onClick={handleSaveOrder}
                            disabled={!hasChanged}
                        >
                            Save Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}