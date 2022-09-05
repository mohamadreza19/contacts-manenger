import React from "react";
import ReactDom from 'react-dom/client'
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom";


import App from "./App";
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.min.css'
import About from "./components/contact/About";


const root =ReactDom.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>

        </BrowserRouter>
    </React.StrictMode>
)