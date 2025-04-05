import { useForm } from "../../hooks/useForm";
import { LuBold } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { IoTextOutline } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { HiOutlineMicrophone } from "react-icons/hi";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { GoItalic } from "react-icons/go";
import { GoListOrdered } from "react-icons/go";
import { GoListUnordered } from "react-icons/go";
import { IoMdList } from "react-icons/io";
import { VscCode } from "react-icons/vsc";
import { PiCodeBlock } from "react-icons/pi";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { GoLink } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

import "./BoxMessages.css";
import useApiRequest from "../../hooks/useApiRequest";
import { toast } from "sonner";
import Spinner from "../../Utils/Spinner/Spinner";
import ENVIROMENT from "../../config/environment";
import { handleError } from "../../Utils/error.utils";

const BoxMessages = ({ channel_id, onMessageSent }) => {
    const formInitialState = {
        content: "",
    };

    const { formState, setFormState, handleOnChange } = useForm(formInitialState);

    const { postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/channels/${channel_id}/messages`
    );

    const token = JSON.parse(sessionStorage.getItem("authorization_token"));
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            toast("Cargando...", {
                icon: <Spinner />,
                duration: 4000,
            });
            console.log("Token obtenido en box-messages:", token);
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const response = await postRequest({
                content: formState.content,
                headers,
            });
            console.log("Response mensaje Creado en BoxMessage:", response);
            if (response.ok) {                
                onMessageSent();
                setFormState(formInitialState);
            }
        } catch (error) {
            console.log("Error al crear mensaje", error);
            handleError(error);
        }
    };

    return (
        <div className="box-messages-input">
            <div className="box-header icons">
                <LuBold />
                <GoItalic />
                <AiOutlineStrikethrough />
                <div className="separator"></div>
                <GoLink />
                <GoListOrdered />
                <GoListUnordered />
                <div className="separator"></div>
                <IoMdList />
                <VscCode />
                <PiCodeBlock />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="box-content">
                    <input
                        type="text"
                        id="content"
                        name="content"
                        placeholder="Enviar un mensaje a "
                        onChange={handleOnChange}
                        value={formState.content}
                    />
                </div>
            </form>
            <div className="box-footer">
                <div className="icons">
                    <button className="icon-plus" type="button">
                        <FaPlus />
                    </button>
                    <IoTextOutline />
                    <BsEmojiSmile />
                    <MdAlternateEmail />
                    <div className="separator"></div>
                    <AiOutlineVideoCamera />
                    <HiOutlineMicrophone />
                    <div className="separator"></div>
                    <MdOutlineIndeterminateCheckBox />
                </div>
                <div className="send">
                    <button type="submit">
                        <IoMdSend />
                    </button>
                    <div className="separator"></div>
                    <button type="button">
                        <IoIosArrowDown />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoxMessages;
