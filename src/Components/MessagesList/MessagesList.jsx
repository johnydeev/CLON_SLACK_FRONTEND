import React, { useEffect, useState } from "react";
import useApiRequest from "../../hooks/useApiRequest"; // ✅ Importar hook correctamente
import ENVIROMENT from "../../config/environment";
import "./MessagesList.css";
import { toast } from "sonner";
import { ServerError } from "../../Utils/error.utils";

const MessagesList = ({ channel_id, refreshMessages }) => {
    // ✅ Recibir refreshMessages
    console.log("Channel_id en MessageList", channel_id);

    const { getRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/channels/${channel_id}/messages`
    );

    const [messagesState, setMessagesState] = useState([]);

    const token = JSON.parse(sessionStorage.getItem("authorization_token"));

    const fetchMessages = async () => {
        console.log("Token obtenido en box-messages:", token);

        const response = await getRequest({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Response Api:", response);

        if (response.ok) {
            // ✅ Solo actualizar el estado si los mensajes cambiaron
            if (
                JSON.stringify(response.data.messages) !==
                JSON.stringify(messagesState)
            ) {
                setMessagesState(response.data.messages);
            }
        } else {
            throw new ServerError(response.message, response.status);
        }
    };

    useEffect(() => {
        if (!channel_id) return;
        fetchMessages();
    }, [channel_id, refreshMessages]); // ✅ Se recarga solo cuando cambia el canal o un nuevo mensaje llega

    console.log("Message List: ", messagesState);

    return (
        <div className="messages-list">
            {messagesState.length > 0 ? (
                messagesState.map((message, index) => (
                    <div key={index} className="message-item">
                        <div className="message-item-left">
                            <img
                                src={message.profile_img}
                                alt=""
                                width={40}
                                height={40}
                            />
                            <div className="message-profile">
                                <span>{message.username}</span>
                                <p>{message.content}</p>
                            </div>
                        </div>
                        <div>
                            {new Date(message.created_at).toLocaleTimeString(
                                [],
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay mensajes en este canal</p>
            )}
        </div>
    );
};

export default MessagesList;
