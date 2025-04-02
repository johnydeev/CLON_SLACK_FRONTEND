import { useParams } from "react-router-dom";
import WorkspaceItem from "../WorkspaceItem/WorkspaceItem";
import "./WorkspaceList.css";
import Spinner from "../../Utils/Spinner/Spinner";
const WorkspaceList = ({ workspaces }) => {
    const { user_id } = useParams(); // Obtener el user_id de la ruta

    if (!workspaces || workspaces.length === 0) {
        return (
            <div className="workspaces-loading">
                <p>Cargando Workspaces...</p> <Spinner />
            </div>
        );
    }

    return (
        <div className="workspace-list">
            <ul>
                {workspaces.map((workspace, index) => (
                    <WorkspaceItem
                        key={index}
                        workspace={workspace}
                        user_id={user_id}
                    />
                ))}
            </ul>
        </div>
    );
};

export default WorkspaceList;
