import React from "react";
import "./NavbarRegister.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const NavbarRegister = () => {

    return (
        <div className="navbar-register">
            <div className="logo">
                <Link to={`http://localhost:5173`}>
                    <img src="/images/slack-logo.png" alt="" />
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
                <button className="btn-purple">HABLAR CON VENTAS</button>
                <button className="btn-white">
                    CREAR NUEVO ESPACIO DE TRABAJO
                </button>
            </div>
        </div>
    );
};
