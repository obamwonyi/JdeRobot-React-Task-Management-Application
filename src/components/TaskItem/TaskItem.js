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
    return (
        <div className={taskItemStyles.container}>

            <div className={taskItemStyles.leftDiv}>

                <h3 className={taskItemStyles.title}>Task Item</h3>

                <p className={taskItemStyles.paragraph}>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

                <p className={taskItemStyles.paragraph}>
                    3 Mon 2025
                </p>

            </div>


            <div className={taskItemStyles.rightDiv}>

                <div className={taskItemStyles.filtersDiv}>

                    <button className={taskItemStyles.filterButton}>Category</button>

                    <div className={taskItemStyles.iconDiv}>
                        <Groceries className={taskItemStyles.iconStyle}/>

                        <p className={taskItemStyles.iconText}>groceries</p>

                    </div>

                </div>

                <div className={taskItemStyles.filtersDiv}>

                    <button className={taskItemStyles.filterButton}>Status</button>

                    <div className={taskItemStyles.iconDiv}>
                        <Incomplete className={taskItemStyles.iconStyle}/>

                        <p className={taskItemStyles.iconText}>Incomplete</p>

                    </div>

                </div>

                <div className={taskItemStyles.filtersDiv}>

                    <button className={taskItemStyles.filterButton}>Priority</button>

                    <div className={taskItemStyles.iconDiv}>
                        <High className={taskItemStyles.iconStyle}/>

                        <p className={taskItemStyles.iconText}>High</p>

                    </div>

                </div>

            </div>

        </div>
    )
}