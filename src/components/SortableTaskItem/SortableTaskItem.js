import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRef } from 'react';
import styles from "./SortableTaskItem.module.css";
import taskItemStyles from "../TaskItem/TaskItem.module.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Completed } from "../../assets/icons/completed.svg";
import { ReactComponent as Groceries } from "../../assets/icons/groceries.svg";
import { ReactComponent as High } from "../../assets/icons/high.svg";
import { ReactComponent as Incomplete } from "../../assets/icons/incomplete.svg";
import { ReactComponent as Low } from "../../assets/icons/low.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Personal } from "../../assets/icons/personal.svg";
import { ReactComponent as Work } from "../../assets/icons/work.svg";

export default function SortableTaskItem({ task, id }) {
    const navigate = useNavigate();
    const mouseDownPosRef = useRef({ x: 0, y: 0 });
    const hasDraggedRef = useRef(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 0
    };

    const {
        title,
        description,
        priority,
        category,
        dueDate,
        due_date,
        completed
    } = task;

    const dueDateValue = dueDate || due_date || null;
    const status = completed ? 'completed' : 'incomplete';

    const getStringValue = (value) => {
        if (typeof value === 'string') {
            return value.toLowerCase();
        } else if (value && typeof value === 'object' && value.name) {
            return value.name.toLowerCase();
        }
        return '';
    };

    const getDisplayText = (value) => {
        if (typeof value === 'string') {
            return value;
        } else if (value && typeof value === 'object' && value.name) {
            return value.name;
        }
        return '';
    };

    const getCategoryIcon = (category) => {
        const categoryValue = getStringValue(category);

        switch (categoryValue) {
            case 'groceries':
                return <Groceries className={taskItemStyles.iconStyle} />;
            case 'work':
                return <Work className={taskItemStyles.iconStyle} />;
            case 'personal':
                return <Personal className={taskItemStyles.iconStyle} />;
            default:
                return <Personal className={taskItemStyles.iconStyle} />;
        }
    };

    const getStatusIcon = (status) => {
        const statusValue = getStringValue(status);

        switch (statusValue) {
            case 'completed':
                return <Completed className={taskItemStyles.iconStyle} />;
            case 'incomplete':
                return <Incomplete className={taskItemStyles.iconStyle} />;
            default:
                return <Incomplete className={taskItemStyles.iconStyle} />;
        }
    };

    const getPriorityIcon = (priority) => {
        const priorityValue = getStringValue(priority);

        switch (priorityValue) {
            case 'high':
                return <High className={taskItemStyles.iconStyle} />;
            case 'medium':
                return <Medium className={taskItemStyles.iconStyle} />;
            case 'low':
                return <Low className={taskItemStyles.iconStyle} />;
            default:
                return <Medium className={taskItemStyles.iconStyle} />;
        }
    };

    const formattedDate = dueDateValue ? new Date(dueDateValue).toLocaleDateString() : "No due date";

    const handleMouseDown = (e) => {
        mouseDownPosRef.current = { x: e.clientX, y: e.clientY };
        hasDraggedRef.current = false;
    };

    const handleMouseMove = (e) => {
        if (!hasDraggedRef.current) {
            const deltaX = Math.abs(e.clientX - mouseDownPosRef.current.x);
            const deltaY = Math.abs(e.clientY - mouseDownPosRef.current.y);

            if (deltaX > 5 || deltaY > 5) {
                hasDraggedRef.current = true;
            }
        }
    };

    const handleMouseUp = (e) => {
        if (!hasDraggedRef.current && !isDragging) {
            navigate(`/tasks/${id}`);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={styles.sortableTaskItem}
            {...attributes}
            {...listeners}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className={`${taskItemStyles.container} ${taskItemStyles.clickable}`}>
                <div className={taskItemStyles.leftDiv}>
                    <h3 className={taskItemStyles.title}>{title || "Task Item"}</h3>
                    <p className={taskItemStyles.paragraph}>
                        {description || "No description provided."}
                    </p>
                    <p className={taskItemStyles.paragraph}>
                        Due: {formattedDate}
                    </p>
                </div>

                <div className={taskItemStyles.rightDiv}>
                    <div className={taskItemStyles.filtersDiv}>
                        <button className={taskItemStyles.filterButton}>Category</button>
                        <div className={taskItemStyles.iconDiv}>
                            {getCategoryIcon(category)}
                            <p className={taskItemStyles.iconText}>{getDisplayText(category) || "personal"}</p>
                        </div>
                    </div>

                    <div className={taskItemStyles.filtersDiv}>
                        <button className={taskItemStyles.filterButton}>Status</button>
                        <div className={taskItemStyles.iconDiv}>
                            {getStatusIcon(status)}
                            <p className={taskItemStyles.iconText}>{getDisplayText(status)}</p>
                        </div>
                    </div>

                    <div className={taskItemStyles.filtersDiv}>
                        <button className={taskItemStyles.filterButton}>Priority</button>
                        <div className={taskItemStyles.iconDiv}>
                            {getPriorityIcon(priority)}
                            <p className={taskItemStyles.iconText}>{getDisplayText(priority) || "low"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}