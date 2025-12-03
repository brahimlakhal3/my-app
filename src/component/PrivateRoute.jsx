import {UserAuth} from "../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, redirectIfLoggedIn = false}) => {
    const {session} = UserAuth();


    if (redirectIfLoggedIn && session) return <Navigate to="/main" replace/>;
    if (!redirectIfLoggedIn && !session) return <Navigate to="/login" replace/>;
    return children;
};

export default ProtectedRoute;