import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ENVIROMENT from "../../config/environment";
import { AuthContext } from "../../Context/authContext";
import "./FormRewritePassword.css";
import { useForm } from "../../hooks/useForm";
import useApiRequest from "../../hooks/useApiRequest";
import { toast } from "sonner";
import Spinner from "../../Utils/Spinner/Spinner";

const FormRewritePassword = () => {
    const { isAuthenticatedState, userState } = useContext(AuthContext);
    const userId = userState._id;

    const [searchParams] = useSearchParams();
    console.log("USERID>>", userId);
    const formInitialState = {
        password: "",
        confirmPassword: "",
        reset_token: "",
    };

    const { formState, setFormState, handleOnChange } =
        useForm(formInitialState);

    const { responseApiState, putRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/auth/reset-password`
    );

    const navigate = useNavigate();

    useEffect(() => {
        const currentPath = window.location.pathname;

        if (
            isAuthenticatedState &&
            userState._id &&
            currentPath == "/rewrite-password"
        ) {
            navigate(`/user/${userState._id}/workspaces`);
        }
    }, [isAuthenticatedState, userState._id, navigate]);

    useEffect(() => {
        const tokenFromQuery = searchParams.get("reset_token");
        if (tokenFromQuery) {
            setFormState((prevState) => ({
                ...prevState,
                reset_token: tokenFromQuery,
            }));
        }
    }, [searchParams, setFormState]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        toast("Cargando...", {
            icon: <Spinner />,
            duration: 4000,
        });
        const response = await putRequest(formState);
        console.log("Response en rewritePass>>", response);
        if (response.ok) {
            console.log("ResponseApiSubmit>>", responseApiState);            
            navigate("/login");
        } else {
            console.error("Error: La respuesta de la API no es válida.");
            
        }
    };

    return (
        <div className="container">
            <h1 className="form-login-h1">Resetear contraseña</h1>
            <form onSubmit={handleSubmit} className="form-wrapper">
                <div className="form-content">
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

                    <div className="form-footer">
                        <label htmlFor="confirmPassword">
                            Repetir contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Ingresa tu contraseña"
                            autoComplete="current-password"
                            onChange={handleOnChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit">Cambiar contraseña</button>
                </div>
            </form>
        </div>
    );
};

export default FormRewritePassword;
