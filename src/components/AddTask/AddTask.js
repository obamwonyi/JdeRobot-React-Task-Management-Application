import addTaskStyles from "./AddTask.module.css";
import {useState} from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DatePicker from "../DatePicker/DatePicker";

export default function AddTask()
{
    const [titleValue, setTitleValue] = useState("");
    const [taskValue, setTaskValue] = useState("");


    const categories = [
        { value: 'personal', label: 'Personal' },
        { value: 'work', label: 'Work' },
        { value: 'groceries', label: 'Groceries' }
    ];
    const priorities = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: 'transparent',
            border: `1px solid var(--primary-text-color-hover)`,
            borderRadius: '4px',
            width: '100%'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? 'rgba(var(--primary-text-color), 0.2)'
                : 'transparent',
            '&:hover': {
                backgroundColor: 'rgba(var(--primary-text-color), 0.1)'
            }
        })
    };


    const handleDateSelect = (date) => {
        console.log('Selected date:', date);
    };


    return (
        <div className={addTaskStyles.container}>

            <div className={addTaskStyles.leftDiv}>

                <div className={addTaskStyles.inputDiv}>
                    <label className={addTaskStyles.label} htmlFor="title">Title</label>
                    <input
                        className={addTaskStyles.title}
                        type="text"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                    />
                </div>

                <div className={addTaskStyles.inputDiv}>
                    <label className={addTaskStyles.label} htmlFor="title">Task (what you intend to do)</label>
                    <textarea
                        className={addTaskStyles.task}
                        value={taskValue}
                        onChange={(e) => setTaskValue(e.target.value)}
                    >

                    </textarea>
                </div>

                <div className={addTaskStyles.categoryAndPriorityDiv}>

                    <div className={addTaskStyles.inputDiv}>
                        <label className={addTaskStyles.label} htmlFor="title">Category</label>

                        <DropDownButton
                            options={categories}
                            styles={customStyles}
                            defaultValue={categories[0]}
                        />

                    </div>

                    <div className={addTaskStyles.inputDiv}>
                        <label className={addTaskStyles.label} htmlFor="title">Priority</label>

                        <DropDownButton
                            options={priorities}
                            styles={customStyles}
                            defaultValue={priorities[0]}
                        />

                    </div>

                </div>

            </div>


            <div className={addTaskStyles.rightDiv}>
                <DatePicker onDateSelect={handleDateSelect} />

                <div className={addTaskStyles.buttonDiv}>
                    <button className={addTaskStyles.addTaskButton}>Add Task</button>
                </div>
            </div>

        </div>
    )
}