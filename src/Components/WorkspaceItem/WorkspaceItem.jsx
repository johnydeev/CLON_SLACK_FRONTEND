import React from "react";
import "./WorkspaceItem.css";
import { useNavigate } from "react-router-dom";
const WorkspaceItem = ({ workspace, user_id }) => {
  
    const navigate = useNavigate();

    const handleWorkspace = async (workspace_id) => {
        
        navigate(`/user/${user_id}/workspaces/${workspace_id}`);
    };
    return (
        <div className="workspace-item">
            <div className="workspace-item-left">
                <div className="workspace-item-img">
                    <img width={60} src="/images/avatar-2.png" alt="Avatar" />
                </div>
                <div className="workspace-item-name">
                    <span className="name">{workspace.name}</span>
                    <span className="miembros">{workspace._id}miembros</span>
                </div>
            </div>
            <div className="workspace-item-right">
                <button onClick={() => handleWorkspace(workspace._id)}>
                    INICIAR SLACK
                </button>
            </div>
        </div>
    );
};

export default WorkspaceItem;
