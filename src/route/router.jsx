import {createBrowserRouter} from "react-router-dom";
import Login from "../component/Login.jsx";
import Signup from "../component/Signup.jsx";
import MainScreen from "../component/MainScreen.jsx";
import ProtectedRoute from "../component/PrivateRoute.jsx";
import NewProduct from "../component/NewProduct.jsx";
import MainLayout from "../MainLayout.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {path: "/", element: <ProtectedRoute redirectIfLoggedIn={true}><Login/></ProtectedRoute>},
            {path: "/login", element: <ProtectedRoute redirectIfLoggedIn={true}><Login/></ProtectedRoute>},
            {path: "/signup", element: <ProtectedRoute redirectIfLoggedIn={true}><Signup/></ProtectedRoute>},
            {path: "/main", element: <ProtectedRoute><MainScreen/></ProtectedRoute>},
            {path: "/add", element: <ProtectedRoute><NewProduct/></ProtectedRoute>},
        ],
    },
]);

export default router;