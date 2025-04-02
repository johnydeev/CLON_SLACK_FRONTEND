import { toast } from "sonner";

export class ServerError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export const handleError = (error) => {
    if (error instanceof ServerError) {
        // Manejo de errores con status específico
        switch (error.status) {
            case 401:
                console.error("Error 401: No autorizado");
                toast.error(
                    `No autorizado. Por favor, inicia sesión.(${error.message})`
                );
                break;
            case 403:
                console.error("Error 403: Prohibido");
                toast.error(`No tienes permiso para realizar esta acción.(${error.message})`);
                break;
            case 404:
                console.error("Error 404: No encontrado");
                toast.error(`El recurso solicitado no fue encontrado.(${error.message})`);
                break;
            case 500:
                console.error("Error 500: Error interno del servidor");
                toast.error(`Error interno del servidor. Por favor, intenta más tarde.
                (${error.message})`
                );
                break;
            default:
                console.error(`Error ${error.status}: ${error.message}`);
                toast.error(`Error del servidor: ${error.message}`);
                break;
        }
    } else if (error instanceof Error) {
        // Manejo de errores genéricos
        console.error(`Error: ${error.message}`);
        toast.error(
            "Ocurrió un error inesperado. Por favor, intenta nuevamente."
        );
    } else {
        // Manejo de errores desconocidos
        console.error("Error desconocido:", error);
        toast.error("Ocurrió un error desconocido.");
    }
};
