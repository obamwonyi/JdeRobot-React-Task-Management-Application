import dashboardHeaderStyles from "./DashboardHeader.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as User } from "../../assets/icons/user.svg";

export default function DashboardHeader( { userName } ) {
    return (
        <div className={dashboardHeaderStyles.container}>
            <h2 className={`goldman-regular ${dashboardHeaderStyles.header}`}>Task Management Application</h2>

            <div className={dashboardHeaderStyles.linksDiv}>

                <Link to="/" className={dashboardHeaderStyles.link}>Home</Link>

                <Link to="/create_task" className={dashboardHeaderStyles.link}>Creat Task</Link>

                <Link to="/about" className={dashboardHeaderStyles.link}>About</Link>

            </div>

            <div className={dashboardHeaderStyles.usernameDiv}>
                <User className={dashboardHeaderStyles.userIcon} />
                <h3 className={dashboardHeaderStyles.username}>{ userName }</h3>
            </div>
        </div>
    )
}