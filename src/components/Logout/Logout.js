import logoutButtonStyles from './Logout.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/auth/authActions';

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        // Dispatch the logout action to update Redux state
        dispatch(logoutUser());

        // Navigate to login page
        navigate('/login');
    }

    return (
        <div className={logoutButtonStyles.container}>
            <button onClick={handleLogout} className={logoutButtonStyles.button}>Logout</button>
        </div>
    );
}