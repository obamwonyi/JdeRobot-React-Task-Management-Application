import homeStyles from './../styles/pages/Home.module.css';
import {Link} from "react-router-dom";

export default function Home()
{
    return(
        <div className={homeStyles.container}>

            <h1 className={homeStyles.header}>Task Management App</h1>

            <h4 className={homeStyles.h4}>Please Signup to continue </h4>

            <Link to="/signup" className={homeStyles.button}> Sign Up</Link>

            <h4 className={homeStyles.h4}>Please Login if you already have an account</h4>

            <Link to="/login" className={homeStyles.button}> Login</Link>
        </div>
    )
}