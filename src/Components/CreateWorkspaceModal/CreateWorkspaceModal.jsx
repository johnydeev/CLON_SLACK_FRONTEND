import React, { useContext, useState } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";

const CreateWorkspaceModal = () => {

    const { getWorkspaces, createWorkspace } = useContext(WorkspaceContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workspaceName, setWorkspaceName] = useState("");


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setWorkspaceName("");
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
        <>
            <button onClick={openModal} className="btn-white">
                CREAR NUEVO ESPACIO DE TRABAJO
            </button>
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
        </>
    );
};

export default CreateWorkspaceModal;
