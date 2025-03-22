import taskItemStyles from "./TaskItem.module.css";
import { ReactComponent as Completed} from "../../assets/icons/completed.svg";
import { ReactComponent as Groceries } from "../../assets/icons/groceries.svg";
import { ReactComponent as High } from "../../assets/icons/high.svg";
import { ReactComponent as Incomplete } from "../../assets/icons/incomplete.svg";
import { ReactComponent as Low } from "../../assets/icons/low.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Personal } from "../../assets/icons/personal.svg";
import { ReactComponent as Work } from "../../assets/icons/work.svg";

export default function TaskItem({task}) {

    const getCategoryIcon = (category) => {
        switch(category?.toLowerCase()) {
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
        switch(status?.toLowerCase()) {
            case 'completed':
                return <Completed className={taskItemStyles.iconStyle}/>;
            case 'incomplete':
                return <Incomplete className={taskItemStyles.iconStyle}/>;
            default:
                return <Incomplete className={taskItemStyles.iconStyle}/>; // Default icon
        }
    };

    const getPriorityIcon = (priority) => {
        switch(priority?.toLowerCase()) {
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

    const formattedDate = task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : "3 Mon 2025";

    return (
        <div className={taskItemStyles.container}>
            <div className={taskItemStyles.leftDiv}>
                <h3 className={taskItemStyles.title}>{task?.title || "Task Item"}</h3>
                <p className={taskItemStyles.paragraph}>
                    {task?.description || "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                </p>
                <p className={taskItemStyles.paragraph}>
                    {formattedDate}
                </p>
            </div>


            <div className={taskItemStyles.rightDiv}>
                <div className={taskItemStyles.filtersDiv}>
                    <button className={taskItemStyles.filterButton}>Category</button>
                    <div className={taskItemStyles.iconDiv}>
                        {getCategoryIcon(task?.category)}
                        <p className={taskItemStyles.iconText}>{task?.category || "personal"}</p>
                    </div>
                </div>


                <div className={taskItemStyles.filtersDiv}>
                    <button className={taskItemStyles.filterButton}>Status</button>
                    <div className={taskItemStyles.iconDiv}>
                        {getStatusIcon(task?.status)}
                        <p className={taskItemStyles.iconText}>{task?.status || "incomplete"}</p>
                    </div>
                </div>


                <div className={taskItemStyles.filtersDiv}>
                    <button className={taskItemStyles.filterButton}>Priority</button>
                    <div className={taskItemStyles.iconDiv}>
                        {getPriorityIcon(task?.priority)}
                        <p className={taskItemStyles.iconText}>{task?.priority || "low"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}