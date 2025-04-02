import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineHashtag } from "react-icons/hi";
import { TbMessageCircleFilled } from "react-icons/tb";
import { VscNewFile } from "react-icons/vsc";
import { GoStack } from "react-icons/go";
import { BsPinAngle } from "react-icons/bs";
import "./HeaderMessages.css";
const HeaderMessages = () => {
    return (
        <div className="header-messages">
            <div className="header-messages-top">
                <div className="header-messages-top-w-name">
                    <HiOutlineHashtag /> {"general"}
                </div>
                <div className="header-messages-top-buttons">
                    <button className="header-messages-top-buttons-left">
                        cantidad de miembros
                    </button>

                    <button className="header-messages-top-buttons-center">
                        <FaHeadphonesSimple />
                        <div className="separator"></div>
                        <IoIosArrowDown />
                    </button>
                    <button className="header-messages-top-buttons-right">
                        <FaEllipsisVertical />
                    </button>
                </div>
            </div>
            <div className="header-messages-bottom">
                <button> <TbMessageCircleFilled /> Mensajes</button>
                <button> <VscNewFile /> Añadir canvas</button>
                <button> <GoStack /> Archivos</button>
                <button> <BsPinAngle /> Chinchetas</button>
                <button className="plus">
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default HeaderMessages;
