import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoxMessages from "@/Components/BoxMessages/BoxMessages";
import Channels from "@/Components/Channels/Channels";
import MessagesList from "@/Components/MessagesList/MessagesList";
import HeaderMessages from "@/Components/HeaderMessages/HeaderMessages";
import SideBar from "@/Components/SideBar/SideBar";
import Navbar from "@/Components/Navbar/Navbar";
import Spinner from "../../Utils/Spinner/Spinner";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import "./HomeScreen.css";

const HomeScreen = () => {
    const { workspace_id } = useParams();
    const { getWorkspaceById } = useContext(WorkspaceContext);
    const workspace_found = getWorkspaceById(workspace_id);
    // 🆕 Estado para manejar el canal seleccionado
    const [selectedChannel, setSelectedChannel] = useState(null);

    const [refreshMessages, setRefreshMessages] = useState(false);

    if (!workspace_found)
        return (
            <div className="workspaces-loading">
                Cargando workspace...
                <div className="spinner-workspace">
                    <Spinner />
                </div>
            </div>
        );

    const handleChannelSelect = (channel) => {
        console.log("Channel en HomeScreen", channel);
        setSelectedChannel(channel);
    };
    const triggerMessageUpdate = () => {
        setRefreshMessages((prev) => !prev); // 🔄 Cambia el estado para forzar la recarga
    };
    // useEffect(() => {
    //     if (workspace_found && workspace_found.channels?.length > 0) {
    //         setSelectedChannel(workspace_found.channels[0]); // ✅ Establecer el primer canal como predeterminado
    //     }
    // }, [workspace_found]);

    return (
        <div className="home">
            <div className="navbar">
                <Navbar workspaceName={workspace_found?.name} />
            </div>
            <div className="body">
                <aside className="sidebar">
                    <SideBar />
                </aside>
                <div className="workspace">
                    <div className="channels">
                        {/* 🆕 Pasar la función para seleccionar un canal */}
                        <Channels
                            workspace={workspace_found}
                            onChannelSelect={handleChannelSelect} // ✅ Aquí está el evento correctamente pasado
                        />
                    </div>
                    <div className="messages">
                        <div className="header-messages">
                            <HeaderMessages channel_name={selectedChannel?.name} />
                        </div>
                        <MessagesList
                            channel_id={selectedChannel?.id}
                            refreshMessages={refreshMessages}
                        />
                        <div className="box-messages">
                            <BoxMessages
                                channel_id={selectedChannel?.id}
                                onMessageSent={triggerMessageUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
