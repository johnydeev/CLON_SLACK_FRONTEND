import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ENVIROMENT from "../../config/environment";
import { AuthContext } from "../../Context/authContext";
import "./FormResetPassword.css";
import { useForm } from "../../hooks/useForm";
import useApiRequest from "../../hooks/useApiRequest";
import { toast } from "sonner";
import Spinner from "../../Utils/Spinner/Spinner";

export const FormResetPassword = () => {
    const { isAuthenticatedState, userState } = useContext(AuthContext);

    const userId = userState._id;
    console.log("USERID>>", userId);
    const formInitialState = {
        email: "",
    };

    const { formState, handleOnChange } = useForm(formInitialState);

    const { responseApiState, postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/auth/reset-password`
    );

    const navigate = useNavigate();

    useEffect(() => {
        const currentPath = window.location.pathname;

        if (
            isAuthenticatedState &&
            userState._id &&
            currentPath !== "/reset-password"
        ) {
            navigate(`/user/${userState._id}/workspaces`);
        }
    }, [isAuthenticatedState, userState._id, navigate]);

    const token = JSON.parse(sessionStorage.getItem("authorization_token"));
    const handleSubmit = async (event) => {
        event.preventDefault();
        toast("Cargando...", {
            icon: <Spinner />,
            duration: 4000,
        });

        const response = await postRequest({
            email: formState.email,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Response>>", response);
    };

    return (
        <div className="container">
            <h1 className="title-form">Recupera tu cuenta</h1>
            <form onSubmit={handleSubmit} className="form-wrapper">
                <div className="form-content">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu email"
                            autoComplete="username"
                            onChange={handleOnChange}
                        />
                    </div>
                </div>

                <div className="form-footer">
                    <Link to={`/register`} className="link">
                        ¿No estas registrado? Click Aqui
                    </Link>
                    <button type="submit">Recuperar clave</button>
                </div>
            </form>
        </div>
    );
};
