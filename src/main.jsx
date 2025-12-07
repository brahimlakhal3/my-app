import {createRoot} from 'react-dom/client'
import './index.css'
import {AuthContextProvider} from "./context/AuthContext.jsx";
import router from "./route/router.jsx";
import {RouterProvider} from "react-router-dom";


createRoot(document.getElementById('root')).render(
    <>
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    </>
)
