import homeFloatButtonStyles from './HomeFloatButton.module.css';
import {Link} from "react-router-dom";
export default function HomeFloatButton()
{
    return (
        <div className={homeFloatButtonStyles.container}>
            <Link to="/" className={homeFloatButtonStyles.button}> Go Home </Link>
        </div>
    )
}