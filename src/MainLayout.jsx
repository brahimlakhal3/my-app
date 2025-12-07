import Navbar from "./component/Navbar.jsx";
import {Outlet} from "react-router-dom";
import {UserAuth} from "./context/AuthContext.jsx";

const App = () => {

    const {session} = UserAuth();

    return (
        <>
            {session && <Navbar/>}
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default App;