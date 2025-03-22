import dashboardHeaderStyles from "./DashboardHeader.module.css";
import { Link } from "react-router-dom";
import User from "../User/User";


export default function DashboardHeader( { userName } ) {



    return (
        <div className={dashboardHeaderStyles.container}>
            <h2 className={`goldman-regular ${dashboardHeaderStyles.header}`}>Task Management Application</h2>

            <div className={dashboardHeaderStyles.linksDiv}>

                <Link to="/" className={dashboardHeaderStyles.link}>Home</Link>

                <Link to="/create_task" className={dashboardHeaderStyles.link}>Creat Task</Link>

                <Link to="/about" className={dashboardHeaderStyles.link}>About</Link>

            </div>

            <User userName={userName} />

        </div>
    )
}