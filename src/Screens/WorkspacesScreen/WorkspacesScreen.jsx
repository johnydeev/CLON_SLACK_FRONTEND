import React, { useContext, useEffect, useState } from "react";
import "./WorkspacesScreen.css";
import { AuthContext } from "../../Context/authContext";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import { NavbarRegister } from "../../Components/NavbarRegister/NavbarRegister";
import WorkspaceList from "../../Components/WorkspaceList/WorkspaceList";
const WorkspacesScreen = () => {

    const { isAuthenticatedState, userState } = useContext(AuthContext);
    const { workspaceState, getWorkspaces, createWorkspace } = useContext(WorkspaceContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workspaceName, setWorkspaceName] = useState("");
    const user = userState

    useEffect(() => {
        if (userState._id) {
            getWorkspaces();
        }
    }, [userState._id]);  
    console.log("workspaceState Screen:", workspaceState);
    console.log("Esta autenticado: ", isAuthenticatedState);
    console.log("userStateScreen>>>", userState);
    const workspaces = workspaceState?.data ?? [];



    console.log("Workspaces>>>>", workspaces);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setWorkspaceName(""); // Limpiar input
    };
    const handleCreateWorkspace = async (event) => {
        event.preventDefault();
        if (!workspaceName.trim()) {
            alert("El nombre del workspace no puede estar vacío");
            return;
        }

        await createWorkspace({ name: workspaceName });
        getWorkspaces();
        closeModal();
    };
    return (
        <div className="workspaces-screen">
            <NavbarRegister />
            <div className="container-workspaces">
                <div className="welcome">
                    <span>👋 ¡Hola de nuevo!</span>
                </div>

                <div className="body-workspaces">
                    <div className="email-workspace">
                        {user
                            ? `Espacios de trabajo para ${user.email}`
                            : "Cargando..."}
                    </div>
                    <div className="workspaces-list">
                        <WorkspaceList workspaces={workspaces} />
                    </div>
                </div>
                <div className="footer-workspaces">
                    <img
                        className="img-workspaces"
                        src="/images/woman-with-laptop-color-background.png"
                        alt="woman-with-laptop-color-background"
                    />
                    <span>¿Quieres usar Slack con otro equipo?</span>
                    <button onClick={openModal} className="btn-white">
                        CREAR NUEVO ESPACIO DE TRABAJO
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Crear Nuevo Workspace</h2>
                        <form onSubmit={handleCreateWorkspace}>
                            <input
                                type="text"
                                placeholder="Nombre del Workspace"
                                value={workspaceName}
                                onChange={(e) =>
                                    setWorkspaceName(e.target.value)
                                }
                            />
                            <div className="modal-buttons">
                                <button type="submit" className="btn-create">
                                    Crear
                                </button>
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkspacesScreen;
