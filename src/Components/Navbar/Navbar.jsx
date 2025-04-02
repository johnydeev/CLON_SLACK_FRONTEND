import { LuArrowRight } from "react-icons/lu";
import { FiArrowLeft } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="hidden"></div>
            <div className="nav">
                <div></div>
                <div className="nav-btn">
                    <button>
                        <FiArrowLeft />
                    </button>
                    <button>
                        <LuArrowRight />
                    </button>
                    <button>
                        <LuClock3 />
                    </button>
                </div>
            </div>
            <div className="search">
                <div className="search-left-container">
                    <button>
                        Buscar en UTN_MAR_JUE_PWI_TN <CiSearch />
                    </button>
                </div>
                <div className="nav-btn">
                    <button className="logout-btn">Cerrar sesion</button>
                </div>
                <div className="search-right-container">
                    <button>
                        <AiOutlineQuestionCircle />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
