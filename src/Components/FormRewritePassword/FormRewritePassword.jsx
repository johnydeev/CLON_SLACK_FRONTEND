import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ENVIROMENT from "../../config/environment";
import { AuthContext } from "../../Context/authContext";
import "./FormRewritePassword.css";
import { useForm } from "../../hooks/useForm";
import useApiRequest from "../../hooks/useApiRequest";
import { toast } from "sonner";
import Spinner from "../../Utils/Spinner/Spinner";

const FormRewritePassword = () => {
    const { isAuthenticatedState, userState, login, getUser } =
        useContext(AuthContext);
    const userId = userState._id;
    console.log("USERID>>", userId);
    const formInitialState = {
        password: "",
        confirmPassword: "",
    };

    const { formState, handleOnChange } = useForm(formInitialState);

    const { responseApiState, postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/auth/login`
    );

    const navigate = useNavigate();

    useEffect(() => {
            const currentPath = window.location.pathname;
    
            if (
                isAuthenticatedState &&
                userState._id &&
                currentPath !== "/rewrite-password"
            ) {
                navigate(`/user/${userState._id}/workspaces`);
            }
        }, [isAuthenticatedState, userState._id, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        toast("Cargando...", {
            icon: <Spinner />,
            duration: 4000,
        });
        const response = await postRequest(formState);
        console.log("Response>>", response);
        if (response.payload.authorization_token) {
            console.log("ResponseApiSubmit>>", responseApiState);
            login(response.payload.authorization_token.authorization_token);
            await getUser();
            // navigate(`/user/${workspaceState.data.user_id}/workspaces`);
        } else {
            console.error("Error: La respuesta de la API no es válida.");
            toast.error("Error al iniciar sesión.");
        }
    };

    return (
        <div className="container">
            <h1>Resetear contraseña</h1>
            <form onSubmit={handleSubmit}>                

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Repetir contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="form-group">
                    
                    <button type="submit">Cambiar contraseña</button>
                </div>
            </form>
        </div>
    );
};

export default FormRewritePassword;
