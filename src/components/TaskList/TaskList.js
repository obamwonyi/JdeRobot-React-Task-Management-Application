import taskListStyles from "./TaskList.module.css";
import { ReactComponent as Drag } from "../../assets/icons/drag.svg";
import { ReactComponent as Click } from "../../assets/icons/click.svg";
import { ReactComponent as Save } from "../../assets/icons/save.svg";
import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTaskItem from "../SortableTaskItem/SortableTaskItem";

export default function TaskList({ tasks = [], onSaveOrder }) {
    const [taskItems, setTaskItems] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        setTaskItems([...tasks]);
    }, [tasks]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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

    // Function to handle saving the new order
    const handleSaveOrder = () => {
        if (onSaveOrder && hasChanged) {
            onSaveOrder(taskItems);
            setHasChanged(false);
        }
    };

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
                            className={`${taskListStyles.button} ${hasChanged ? taskListStyles.buttonActive : ''}`}
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