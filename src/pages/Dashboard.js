import dashboard from "../styles/pages/Dashboard.module.css";
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import SearchBar from '../components/SearchBar/SearchBar';
import TaskTable from '../components/TaskTable/TaskTable';

export default function Dashboard() {


    const tasks = [
        { id: 1, title: 'Task 1', description: 'Description for Task 1' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2' },
        { id: 3, title: 'Task 3', description: 'Description for Task 3' },
    ];

    return (
        <div className={dashboard.container}>
            {/* Header component */}
            <DashboardHeader />

            {/* SearchBar component */}
            <SearchBar />

            {/* TaskTable component */}
            <TaskTable tasks={tasks} />

        </div>
    )
}
