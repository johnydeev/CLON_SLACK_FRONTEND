import { useState } from "react";
import { RiArrowDownSLine, RiMenu5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { MdOutlineHeadphones, MdArrowRight } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { Link } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import ENVIROMENT from "../../config/environment";
import "./Channels.css";
import { useForm } from "../../hooks/useForm";
import { handleError, ServerError } from "../../Utils/error.utils";

const Channels = ({ workspace }) => {
    const { name, _id: workspace_id, channels } = workspace;

    const formInitialState = {
        name: "",
    };
    const { formState, handleOnChange } = useForm(formInitialState);
    const { postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/channels/${workspace_id}`
    );

    const [activeItem, setActiveItem] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleActiveItem = (index) => setActiveItem(index);
    const toggleDropdown = (index) =>
        setActiveDropdown(activeDropdown === index ? null : index);
    const toggleChannelDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const token = JSON.parse(sessionStorage.getItem("authorization_token"));
    const handleCreateChannel = async (e) => {
        try {
            e.preventDefault();           

            console.log("Token obtenido en Channels:", token);
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            console.log("FormState en channels: ",formState)

            const response = await postRequest({
                name: formState.name,
                headers,
            });
            if(!response){
                throw new ServerError("Error al obtener respuesta de la API", 500)
            }
        } catch (error) {
            console.log("Error al crear un canal", error);
            handleError(error);
        }
    };

    return (
        <>
            <div className="channels-header">
                <button>
                    <Link className="color-w" to={"/workspace/1"}>
                        {name} <RiArrowDownSLine />
                    </Link>
                </button>
                <div className="channels-header-menu-btn">
                    <button className="channels-header-btn">
                        <RiMenu5Line />
                    </button>
                    <button className="channels-header-btn">
                        <BiEdit />
                    </button>
                </div>
            </div>

            <div className="channels-list">
                <div className="channels-list-sections">
                    {[
                        {
                            icon: <BsChatText />,
                            label: "Hilos de conversaciones",
                        },
                        { icon: <MdOutlineHeadphones />, label: "Juntas" },
                        { icon: <VscSend />, label: "Borradores y enviados" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={
                                activeItem === index ? "active-item" : ""
                            }
                            onClick={() => handleActiveItem(index)}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="color-w channels-list-dropdown">
                    {["Canales", "Mensajes Directos", "Aplicaciones"].map(
                        (label, index) => (
                            <div
                                className={`${
                                    activeDropdown === index
                                        ? "active channels-list-dropdown-items"
                                        : ""
                                }`}
                                key={index}
                            >
                                <div>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                    >
                                        <i
                                            className={
                                                activeDropdown === index
                                                    ? "rotate"
                                                    : ""
                                            }
                                        >
                                            <MdArrowRight />
                                        </i>
                                    </button>
                                    <button
                                        onClick={
                                            label === "Canales"
                                                ? toggleChannelDropdown
                                                : undefined
                                        }
                                    >
                                        <span>{label}</span>
                                        <RiArrowDownSLine />
                                    </button>
                                </div>

                                {label === "Canales" &&
                                    activeDropdown === index && (
                                        <div className="channels-list-dropdown-1">
                                            {channels && channels.length > 0 ? (
                                                <ul>
                                                    {channels.map(
                                                        (item, index) => (
                                                            <li key={index}>
                                                                #{" "}
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            ) : (
                                                <p>
                                                    No hay canales disponibles
                                                </p>
                                            )}
                                        </div>
                                    )}
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Dropdown para crear canal */}
            {isDropdownOpen && (
                <div className="dropdown-container">
                    <h4>Crear Canal</h4>
                    <form onSubmit={handleCreateChannel}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre del canal"
                            value={formState.name}
                            onChange={handleOnChange}
                        />
                        <div className="dropdown-actions">
                            <button type="submit">Crear</button>
                            <button
                                type="button"
                                onClick={toggleChannelDropdown}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Channels;

// const { userState } = useContext(AuthContext);
// const { getWorkspaces } = useContext(WorkspaceContext);

// useEffect(() => {
//     if (userState._id) {
//         getWorkspaces();
//     }
// }, [userState._id]);
