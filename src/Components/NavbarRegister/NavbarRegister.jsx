import React, { useContext } from "react";
import "./NavbarRegister.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import ENVIROMENT from "../../config/environment";
import { AuthContext } from "../../Context/authContext";

export const NavbarRegister = () => {
    const { isAuthenticatedState , logout } = useContext(AuthContext);

    return (
        <div className="navbar-register">
            <div className="logo">
                <Link to={`${ENVIROMENT.URL_FRONT}`}>
                    <img src="/images/slack-logo.png" alt="" width={105} />
                </Link>
            </div>
            <div className="menu flex-c">
                <button>
                    <span>Funciones</span>
                    <RiArrowDownSLine />
                </button>
                <button>
                    <span>Soluciones</span>
                    <RiArrowDownSLine />
                </button>
                <button className="menu-underline">
                    <span>Empresa</span>
                </button>
                <button>
                    <span>Recursos</span>
                    <RiArrowDownSLine />
                </button>
                <button className="menu-underline">
                    <span>Precios</span>
                </button>
            </div>
            <div className="flex-c">
                {isAuthenticatedState ? (
                    <div className="flex-c">
                        <button onClick={logout} className="btn-purple">
                            Cerrar Sesion
                        </button>
                        <button className="btn-white">
                            CREAR NUEVO ESPACIO DE TRABAJO
                        </button>
                    </div>
                ) : (
                    <button className="btn-purple">HABLAR CON VENTAS</button>
                )}
            </div>
        </div>
    );
};
