import React from 'react'

import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Root from './pages/Root';
import Logout from './pages/Logout';

const Router = createBrowserRouter(
    [
        {
            path : "/",
            element : <Root/>,
            children : [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/login",
                    element: <Login/>
                },
                {
                    path: "/register",
                    element: <Register/>
                },
                {
                    path: "/upload",
                    element: <Upload/>
                },
                {
                    path: "/logout",
                    element: <Logout/>
                },
                {
                    path:"*",
                    element:<p>404 Error - Nothing here...</p>
                }
            ] 
        }
        
    ]
)

export default Router