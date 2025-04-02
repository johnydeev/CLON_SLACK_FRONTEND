import { createContext, useEffect, useState } from "react";
import useApiRequest from "../hooks/useApiRequest";
import ENVIROMENT from "../config/environment";
import { handleError } from "../Utils/error.utils";

export const WorkspaceContext = createContext();

// eslint-disable-next-line react/prop-types
export const WorkspaceContextProvider = ({ children }) => {
    const { responseApiState, getRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/workspaces`
    );
    const { postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/workspaces`
    );

    const [workspaceState, setWorkspaceState] = useState(null);
    console.log("responseApiState Context: ", responseApiState);
    let token = JSON.parse(sessionStorage.getItem("authorization_token"));

    const [channels, setChannels] = useState([]);

    const getWorkspaces = async () => {
        try {
            token = JSON.parse(sessionStorage.getItem("authorization_token"));
            console.log("Token obtenido:", token);

            const workspacesList = await getRequest({
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Respuesta de la API:", workspacesList);

            if (!workspacesList) {
                console.warn("No se encontraron workspaces en la respuesta");
                return;
            }

            setWorkspaceState((prevState) => {
                return { ...prevState, data: workspacesList.data };
            });
            // setWorkspaceState(workspacesList.data)

            console.log(
                "Nuevo estado de workspaceState Context:",
                workspaceState
            );
        } catch (error) {
            console.error("Error en getWorkspaces:", error);
            handleError(error);
        }
    };

    const createWorkspace = async ({ name: workspaceName }) => {
        try {
            console.log("Token obtenido:", token);
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const response = await postRequest({
                name: workspaceName,
                headers,
            });
            console.log("Response Workspace Creado:", response);
        } catch (error) {
            console.error("Error al crear Workspace:", error);
            handleError(error);
        }
    };

    const getWorkspaceById = (workspace_id) => {
        const workspaces = workspaceState?.data;

        if (!workspaces || !Array.isArray(workspaces)) return null;
        return (
            workspaces.find(
                (workspace) => workspace._id === Number(workspace_id)
            ) || null
        );
    };
    

    useEffect(() => {
        
        getWorkspaces();
    }, []); 

    return (
        <WorkspaceContext.Provider
            value={{
                workspaceState,
                channels,
                responseApiState,
                getRequest,
                getWorkspaces,
                createWorkspace,
                getWorkspaceById,                
                // addNewMessage: addNewMessage,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};

export default WorkspaceContextProvider;

//metodo para agregar un nuevo mensaje
// const addNewMessage = (workspace_id, text) => {
//     const new_message = {
//         author: "YO",
//         text: text,
//         id: uuidv4(),
//         time: new Date().toLocaleString(),
//     };
//     console.log(new_message);
//     setWorkspaceState((prevWorkspaceState) => {
//         const workspace_found = prevWorkspaceState.find(
//             (workspace) => workspace.id === workspace_id
//         );
//         workspace_found.messages.push(new_message);
//         return prevWorkspaceState;
//     });
// };
//metodo para extraer un id
// const getWorkspaceById = (workspace_id) => {
//     return workspaceState.find(
//         (workspace) => workspace.id === Number(workspace_id)
//     );
// };
