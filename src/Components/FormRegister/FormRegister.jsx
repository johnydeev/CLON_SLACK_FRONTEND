import React, { useContext } from "react";
import ENVIROMENT from "../../config/environment";
import { useForm } from "../../hooks/useForm";
import  useApiRequest  from "../../hooks/useApiRequest";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Spinner from "../../Utils/Spinner/Spinner";
import './FormRegister.css'
import { AuthContext } from "../../Context/authContext";

export const FormRegister = () => {
    const formInitialState = {
        username: "",
        email: "",
        password: "",
        // input imagen este debe tener un valor inicial por defecto par aque el urusuario luego pueda subir su imagen personalizada luego de loguearse.
        // profile_img: "",
    };
    const { login } = useContext(AuthContext)

    const { formState, handleOnChange } = useForm(formInitialState);

    const { responseApiState, postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/auth/register`
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        toast("Cargando...", {
            icon: <Spinner />,
            duration: 4000,
        });
        console.log(formState);
        await postRequest(formState);
        login(responseApiState.data.payload.authorization_token);
    };

    console.log(responseApiState);

    return (
        <div className="container">
            <h1>Regístrate</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formState.username}
                        placeholder="Ingresa tu usuario"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        placeholder="Ingresa tu email"
                        autoComplete="username"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                </div>

                {/* <div className="form-group">
                    <label htmlFor="profile_img">Avatar</label>
                    <input
                        type="file"
                        id="profile_img"
                        name="profile_img"                        
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                </div> */}

                <div className="form-group">
                    <Link to={`http://localhost:5173/login`}>
                        ¿Tenes cuenta? Logueate
                    </Link>
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
};
