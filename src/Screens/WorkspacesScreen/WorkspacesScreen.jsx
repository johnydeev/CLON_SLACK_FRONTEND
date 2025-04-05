import React, { useContext, useEffect, useState } from "react";
import "./WorkspacesScreen.css";
import { AuthContext } from "../../Context/authContext";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import { NavbarRegister } from "../../Components/NavbarRegister/NavbarRegister";
import WorkspaceList from "../../Components/WorkspaceList/WorkspaceList";
import CreateWorkspaceModal from "../../Components/CreateWorkspaceModal/CreateWorkspaceModal";
const WorkspacesScreen = () => {

    const {  userState } = useContext(AuthContext);
    const { workspaceState, getWorkspaces } = useContext(WorkspaceContext);

    

    useEffect(() => {
        if (userState._id) {
            getWorkspaces();
        }
    }, [userState._id]);
    console.log("workspaceState Screen:", workspaceState);
    const workspaces = workspaceState?.data ?? [];

    console.log("Workspaces>>>>", workspaces);

    return (
        <div className="workspaces-screen">
            <NavbarRegister />
            <div className="container-workspaces">
                <div className="welcome">
                    <span>👋 ¡Hola de nuevo!</span>
                </div>

                <div className="body-workspaces">
                    <div className="email-workspace">
                        {userState
                            ? `Espacios de trabajo para ${userState.email}`
                            : "Cargando..."}
                    </div>
                    <div className="workspaces-list">
                        {   
                        workspaces.length === 0 
                            ?
                            <div className="no-workspaces">
                                <h2>No tienes espacios de trabajo</h2>
                                <p>¡Crea uno nuevo!</p>
                            </div>
                            : <WorkspaceList workspaces={workspaces} />
                        }
                    </div>
                </div>
                <div className="footer-workspaces">
                    <img
                        className="img-workspaces"
                        src="/images/woman-with-laptop-color-background.png"
                        alt="woman-with-laptop-color-background"
                    />
                    <span>¿Quieres usar Slack con otro equipo?</span>
                    <CreateWorkspaceModal/>
                </div>
            </div>
            
        </div>
    );
};

export default WorkspacesScreen;
