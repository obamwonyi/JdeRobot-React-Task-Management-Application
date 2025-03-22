import taskItemStyles from "./TaskItem.module.css";
import { ReactComponent as Completed} from "../../assets/icons/completed.svg";
import { ReactComponent as Groceries } from "../../assets/icons/groceries.svg";
import { ReactComponent as High } from "../../assets/icons/high.svg";
import { ReactComponent as Incomplete } from "../../assets/icons/incomplete.svg";
import { ReactComponent as Low } from "../../assets/icons/low.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Personal } from "../../assets/icons/personal.svg";
import { ReactComponent as Work } from "../../assets/icons/work.svg";

export default function TaskItem(props) {
    // Now directly accessing properties from props instead of props.task
    const {
        title,
        description,
        priority,
        category,
        dueDate,
        due_date, // Handle both formats
        completed
    } = props;

    // Use either dueDate or due_date
    const dueDateValue = dueDate || due_date || null;

    // Determine status based on the completed property
    const status = completed ? 'completed' : 'incomplete';

    // Helper function to handle objects or strings
    const getStringValue = (value) => {
        if (typeof value === 'string') {
            return value.toLowerCase();
        } else if (value && typeof value === 'object' && value.name) {
            return value.name.toLowerCase();
        }
        return '';
    };

    // Helper function to display text values
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

        switch(categoryValue) {
            case 'groceries':
                return <Groceries className={taskItemStyles.iconStyle}/>;
            case 'work':
                return <Work className={taskItemStyles.iconStyle}/>;
            case 'personal':
                return <Personal className={taskItemStyles.iconStyle}/>;
            default:
                return <Personal className={taskItemStyles.iconStyle}/>; // Default icon
        }
    };

    const getStatusIcon = (status) => {
        const statusValue = getStringValue(status);

        switch(statusValue) {
            case 'completed':
                return <Completed className={taskItemStyles.iconStyle}/>;
            case 'incomplete':
                return <Incomplete className={taskItemStyles.iconStyle}/>;
            default:
                return <Incomplete className={taskItemStyles.iconStyle}/>; // Default icon
        }
    };

    const getPriorityIcon = (priority) => {
        const priorityValue = getStringValue(priority);

        switch(priorityValue) {
            case 'high':
                return <High className={taskItemStyles.iconStyle}/>;
            case 'medium':
                return <Medium className={taskItemStyles.iconStyle}/>;
            case 'low':
                return <Low className={taskItemStyles.iconStyle}/>;
            default:
                return <Medium className={taskItemStyles.iconStyle}/>;
        }
    };

    const formattedDate = dueDateValue ? new Date(dueDateValue).toLocaleDateString() : "No due date";

    return (
        <div className={taskItemStyles.container}>
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
    );
}