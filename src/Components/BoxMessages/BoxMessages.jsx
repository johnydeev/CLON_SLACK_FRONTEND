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

const BoxMessages = () => {
    const formInitialState = {
        content: "",
    };

    const { formState, handleOnChange } = useForm(formInitialState);

    const { responseApiState, postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/channels/${6}/messages`
    );

    const token = JSON.parse(sessionStorage.getItem("authorization_token"));
    const handleSubmit = async (event) => {
      try{      
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
        console.log("Response>>", response);
      }catch(error){
        console.log("Error al crear mensaje",error)
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
                {" "}
                {/* Agrega el formulario aquí */}
                <div className="box-content">
                    <input
                        type="text"
                        id="content"
                        name="content"
                        placeholder="Enviar un mensaje a "
                        onChange={handleOnChange}
                        value={formState.content} // Asegurar que el input tiene un estado controlado
                    />
                </div>
                <div className="box-footer">
                    <div className="icons">
                        <button className="icons-plus" type="button">
                            {" "}
                            {/* type="button" para evitar que dispare el submit */}
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
                            {" "}
                            {/* Aquí va el botón de enviar */}
                            <IoMdSend />
                        </button>
                        <div className="separator"></div>
                        <button type="button">
                            {" "}
                            {/* Botón sin funcionalidad de submit */}
                            <IoIosArrowDown />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BoxMessages;
