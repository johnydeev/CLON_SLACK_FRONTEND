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
        console.log("HOLA POST!!!")
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true });
            // Crear un objeto para los headers
            let headers = {
                "Content-Type": "application/json",
            };

            // Si body tiene headers, sobreponlos
            if (body.headers) {
                headers = { ...headers, ...body.headers };
            }

            console.log("Body>>", body);
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (data.ok) {
                setResponseApiState((prevState) => {
                    return { ...prevState, data: data };
                });
                toast.success(data.message);
                return data;
            } else {
                throw new ServerError(data.message, data.status);
            }
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

            if (data.ok) {
                setResponseApiState((prevState) => {
                    return { ...prevState, data: data };
                });
                toast.success(data.message);
            } else {
                throw new ServerError(data.message, data.status);
            }
            console.log(data);
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
            
            // console.log("Headers:", headers); // Depuración
            // console.log("URL:", url); // Depuración
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

    // const getRequest = async () => {
    //     try {
    //         const response = await fetch(url, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         });
    //         const data = await response.json();

    //         if (data.ok) {
    //             setResponseApiState((prevState) => {
    //                 return { ...prevState, data: data };
    //             });
    //             toast.success(data.message, {
    //                 richColors: true,
    //             });
    //         } else {
    //             throw new ServerError(data.message, data.status);
    //         }
    //         console.log(data);
    //     } catch (error) {
    //         setResponseApiState((prevState) => {
    //             if (error.status) {
    //                 toast.error(error.message, {
    //                     description: `ERROR: ${error.status}`,
    //                 });
    //                 return { ...prevState, error: error.message };
    //             }
    //             toast.error(error.message, {
    //                 description: `ERROR: ${error.status}`,
    //             });
    //             return {
    //                 ...prevState,
    //                 error: "No se pudo enviar la informacion al servidor",
    //             };
    //         });
    //     } finally {
    //         setResponseApiState((prevState) => {
    //             return { ...prevState, loading: false };
    //         });
    //     }
    // }

    return { responseApiState, postRequest, putRequest, getRequest };
};

export default useApiRequest;
