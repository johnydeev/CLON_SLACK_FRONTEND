import React, { useContext, useState } from "react";
import "./NavbarRegister.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import CreateWorkspaceModal from "../CreateWorkspaceModal/CreateWorkspaceModal";

export const NavbarRegister = () => {
    const { isAuthenticatedState, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <div className="navbar-register">
                <div className="logo">
                    <Link to={`/`}>
                        <img
                            src="/images/slack-logo.png"
                            alt="logo"
                            width={105}
                        />
                    </Link>
                </div>

                {/* Menú normal (desktop) */}
                <div className="flex-c">
                    <div className="menu">
                        <button className="menu-underline">Empresa</button>
                        <button className="menu-underline">Precios</button>
                        <button>
                            Funciones <RiArrowDownSLine />
                        </button>
                        <button>
                            Soluciones <RiArrowDownSLine />
                        </button>
                        <button>
                            Recursos <RiArrowDownSLine />
                        </button>
                    </div>

                    {isAuthenticatedState ? (
                        <>
                            <button onClick={logout} className="btn-purple">
                                Cerrar Sesión
                            </button>
                            <CreateWorkspaceModal />
                        </>
                    ) : (
                        <button className="btn-purple">
                            HABLAR CON VENTAS
                        </button>
                    )}
                </div>

                {/* Ícono de menú hamburguesa (mobile) */}
                <div className="hamburger" onClick={toggleMenu}>
                    <FiMenu size={24} />
                </div>
            </div>

            {/* Overlay oscuro */}
            {menuOpen && (
                <div className="menu-overlay" onClick={closeMenu}></div>
            )}

            {/* Sidebar (mobile) */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <div className="mobile-menu-header">
                    <FiX size={24} onClick={closeMenu} />
                </div>

                <div className="menu-items">
                    <button className="menu-underline">Empresa</button>
                    <button className="menu-underline">Precios</button>
                    <button>
                        Funciones <RiArrowDownSLine />
                    </button>
                    <button>
                        Soluciones <RiArrowDownSLine />
                    </button>
                    <button>
                        Recursos <RiArrowDownSLine />
                    </button>
                </div>

                <hr />

                <div className="mobile-footer">
                    {isAuthenticatedState ? (
                        <>
                            <button onClick={logout} className="btn-purple">
                                Cerrar Sesión
                            </button>
                            <CreateWorkspaceModal />
                        </>
                    ) : (
                        <button className="btn-purple">
                            HABLAR CON VENTAS
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
