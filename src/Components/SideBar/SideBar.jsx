import { AiFillHome } from "react-icons/ai";
import { PiChatsCircleBold } from "react-icons/pi";
import { GoBell } from "react-icons/go";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import { BsPlusLg } from "react-icons/bs";
import "./Sidebar.css";
const SideBar = () => {

    return (
        <>
            <div className="color-w sidebar-header">
                <div>
                    <button className="btn-initials">U</button>
                </div>
                <div>
                    <button>
                        <AiFillHome />
                    </button>
                    <span className="sidebar-span">Inicio</span>
                </div>
                <div>
                    <button className="botones-css">
                        <PiChatsCircleBold />
                    </button>
                    <span className="sidebar-span">Mensajes</span>
                </div>
                <div>
                    <button className="botones-css">
                        <GoBell />
                    </button>
                    <span className="sidebar-span">Actividad</span>
                </div>
                <div>
                    <button>
                        <TfiLayoutMenuSeparated />
                    </button>
                    <span className="sidebar-span">Mas</span>
                </div>
            </div>
            <div className="sidebar-footer">
                <button>
                    <BsPlusLg />
                </button>

                <img
                    width={36}
                    height={36}
                    src="https://ca.slack-edge.com/T07EJ2FLZ2R-U07ELA3CFQW-999ac5bd03d4-48"
                    alt="avatar castro jonathan"
                />
            </div>
        </>
    );
};

export default SideBar;
