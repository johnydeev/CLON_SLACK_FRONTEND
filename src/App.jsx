import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import WorkspacesScreen from "./Screens/WorkspacesScreen/WorkspacesScreen";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route element={<ProtectedRoute/>}>
                    <Route path="/"/>
                    <Route path="/user/:user_id/workspaces" element={<WorkspacesScreen />} />
                    <Route path="/user/:user_id/workspaces/:workspace_id" element={<HomeScreen />} />
                    
                </Route>
            </Routes>
        </div>
    );
}

export default App;
