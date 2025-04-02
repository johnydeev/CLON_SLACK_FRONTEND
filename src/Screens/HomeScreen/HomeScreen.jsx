import BoxMessages from "@/Components/BoxMessages/BoxMessages";
import Channels from "@/Components/Channels/Channels";
import HeaderMessages from "@/Components/HeaderMessages/HeaderMessages";
import SideBar from "@/Components/SideBar/SideBar";
import Navbar from "@/Components/Navbar/Navbar";
import "./HomeScreen.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";

import Spinner from "../../Utils/Spinner/Spinner";

const HomeScreen = () => {
    const { workspace_id } = useParams();
    const { workspaceState, getWorkspaceById } =
        useContext(WorkspaceContext);

    console.log("Workspace ID: ", workspace_id);
    console.log("WorkspaceState Home: ", workspaceState);
    const workspace_found = getWorkspaceById(workspace_id);
    
    if (!workspace_found) return (
        <div className="workspaces-loading">
            Cargando workspace...
            <div className="spinner-workspace">
                <Spinner />
            </div>
        </div>
    );

    return (
        <div className="home">
            <div className="navbar">
                {" "}
                <Navbar />
            </div>
            <div className="body">
                <aside className="sidebar">
                    <SideBar />
                </aside>
                <div className="workspace">
                    <div className="channels">
                        {" "}
                        <Channels workspace={workspace_found} />{" "}
                    </div>
                    <div className="messages">
                        <div className="header-messages">
                            <HeaderMessages />
                        </div>
                        <div className="box-messages">
                            <BoxMessages />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
