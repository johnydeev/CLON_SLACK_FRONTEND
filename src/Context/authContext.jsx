import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    let isAuthenticatedInitialState = !!sessionStorage.getItem(
        "authorization_token"
    );

    const initialUserState = {
        _id: "",
        username: "",
        email: "",
    };

    const [userState, setUserState] = useState(initialUserState);
    const [isAuthenticatedState, setIsAutheticatedState] = useState(
        isAuthenticatedInitialState
    );

    useEffect(() => {
        if (isAuthenticatedState && !userState._id) {
            // Solo ejecuta si el usuario aún no ha sido cargado
            getUser();
        }
    }, [isAuthenticatedState, userState]); // Se ejecuta solo si cambia `isAuthenticatedState`

    const getUser = () => {
        try {
            const token = sessionStorage.getItem("authorization_token");
            if (token) {
                const tokenData = JSON.parse(token);
                const decoded = jwtDecode(tokenData);                

                // Solo actualiza el estado si los datos cambian
                if (userState._id !== decoded._id) {
                    setUserState({
                        _id: decoded._id,
                        username: decoded.username,
                        email: decoded.email,
                    });
                }
                console.log("UserStateAuth>>>", userState)
            }
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            logout();
        }
    };

    const logout = () => {
        sessionStorage.removeItem("authorization_token");
        setIsAutheticatedState(false);
        setUserState(initialUserState);
    };

    const login = (authorization_token) => {
        sessionStorage.setItem(
            "authorization_token",
            JSON.stringify(authorization_token)
        );
        setIsAutheticatedState(true);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticatedState, logout, login, userState, getUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
