import React from "react";

export const FormResetPassword = () => {
    const { isAuthenticatedState, userState, login, getUser } =
        useContext(AuthContext);
    const { workspaceState } = useContext(WorkspaceContext);

    console.log("Esta autenticado: ", isAuthenticatedState);
    console.log("workspace data:", workspaceState);
    console.log("userState data:", userState);
    const userId = userState._id;
    console.log("USERID>>", userId);
    const formInitialState = {
        email: "",
        password: "",
    };

    const { formState, handleOnChange } = useForm(formInitialState);

    const { responseApiState, postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/auth/login`
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticatedState && userState._id) {
            // Asegurar que _id esté presente
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
            <h1>Ingresa a tu cuenta</h1>
            <form onSubmit={handleSubmit}>
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
                    <Link to={`http://localhost:5173/reset-password`}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <button type="submit">Loguear</button>
                </div>
            </form>
        </div>
    );
};
