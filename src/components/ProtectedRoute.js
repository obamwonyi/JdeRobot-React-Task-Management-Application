import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute()
{
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    // If still loading auth state, you could show a loading spinner
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
