import { useState } from "react";
import { toast } from "sonner";
import { handleError, ServerError } from "../Utils/error.utils";

const useApiRequest = (url) => {
    //conviene guardarlo en el hook porque no es algo que vaya a variar entre componentes
    const initialResponseApiState = {
        loading: false,
        error: null,
        data: null,
    };
    const [responseApiState, setResponseApiState] = useState(initialResponseApiState);

    const postRequest = async (body) => {        
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true });
            
            let headers = {
                "Content-Type": "application/json",
            };

            // Verificar si body.headers existe y es un objeto
            if (body?.headers && typeof body.headers === "object") {
                headers = { ...headers, ...body.headers };
            }

            // Clonar el body y eliminar headers si existen
            const { headers: _, ...bodyWithoutHeaders } = body;

            console.log("Body>>", bodyWithoutHeaders);

            const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(bodyWithoutHeaders),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                throw new Error("La respuesta no es un JSON válido");
            }

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new ServerError(
                    data.message || "Error en la solicitud",
                    response.status
                );
            }

            setResponseApiState((prevState) => {
                return { ...prevState, data };
            });
            toast.success(data.message);
            return data;
        } catch (error) {
            setResponseApiState((prevState) => {
                if (error.status) {
                    toast.error(error.message, {
                        description: `ERROR: ${error.status}`,
                    });
                    return { ...prevState, error: error.message };
                }
                toast.error(error.message, {
                    description: `ERROR: ${error.status}`,
                });
                return {
                    ...prevState,
                    error: "No se pudo enviar la informacion al servidor",
                };
            });
        } finally {
            setResponseApiState((prevState) => {
                return { ...prevState, loading: false };
            });
        }
    };

    const putRequest = async (body) => {
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true });

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            console.log("Data en putRequest>>", data);
            if (data.ok) {
                setResponseApiState((prevState) => ({ 

                    ...prevState, 
                    data: data 
                }));
                toast.success(data.message);
            } else {
                throw new ServerError(data.message, data.status);
            }
            console.log(data);
            return data;
        } catch (error) {
            setResponseApiState((prevState) => {
                if (error.status) {
                    toast.error(error.message, {
                        description: `ERROR: ${error.status}`,
                    });
                    return { ...prevState, error: error.message };
                }
                toast.error(error.message, {
                    description: `ERROR: ${error.status}`,
                });
                return {
                    ...prevState,
                    error: "No se pudo enviar la informacion al servidor",
                };
            });
        } finally {
            setResponseApiState((prevState) => {
                return { ...prevState, loading: false };
            });
        }
    };

    const getRequest = async (options = {}) => {
        setResponseApiState({ loading: true, data: null, error: null });
        
        try {
            const headers = {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            };
            
            console.log("Headers:", headers); // Depuración
            console.log("URL:", url); // Depuración
            const response = await fetch(url, {
                method: "GET",
                headers,
            });

            if (!response.ok) {
                // Intenta leer el mensaje del error desde el cuerpo de la respuesta
                const errorData = await response.json();
                throw new ServerError(
                    errorData.message || "Error desconocido",
                    response.status
                );
            }

            const data = await response.json();
            setResponseApiState({
                loading: false,
                data: data.data,
                error: null,
            });
            return data; 
        } catch (error) {
            console.log("Error en la solicitud GET:", error); // Depuración
            setResponseApiState({
                loading: false,
                data: null,
                error: error.message,
            });
            handleError(error)            
        }
    };

    return { responseApiState, postRequest, putRequest, getRequest };
};

export default useApiRequest;
