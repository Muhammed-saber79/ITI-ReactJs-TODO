import { createBrowserRouter } from "react-router-dom";

import Nav from "./Components/Nav/Nav";
import Home from "./Pages/Home/Home";
import Add from "./Components/Add/Add";
import Edit from "./Components/Edit/Edit";

const Routes = createBrowserRouter([
    { 
        path: "/",
        element: <><Nav/><Home/></>
    },
    {
        path: "/create",
        element: <><Nav/><Add/></>
    },
    {
        path: "/edit",
        element: <><Nav/><Edit/></>
    }
])

export default Routes;