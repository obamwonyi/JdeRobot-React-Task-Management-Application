import userStyles from './User.module.css';
import { ReactComponent as User } from "../../assets/icons/user.svg";

export default function user({ userName }){
    return (
        <div className={userStyles.usernameDiv}>
            <User className={userStyles.userIcon}/>
            <h3 className={userStyles.username}>{userName}</h3>
        </div>
    )
}