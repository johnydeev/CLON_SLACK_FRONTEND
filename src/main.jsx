import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WorkspaceContextProvider from "./Context/WorkspaceContext.jsx";
import App from "./App.jsx";
import "./global.css";
import AuthContextProvider from "./Context/authContext.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthContextProvider>
            <WorkspaceContextProvider>
                <Toaster richColors />
                <App />
            </WorkspaceContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);
