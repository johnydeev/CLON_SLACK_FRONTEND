import { useState } from "react";

export const useForm = (formInitialState) => {
    const [formState, setFormState] = useState(formInitialState);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        // Codigo para subir archivos en formato base64
        // const file_value = e.target?.files
        // if (file_value && file_value[0] instanceof File) {

        //     const file = file_value[0];
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         setFormState((prevFormState) => {
        //             return { ...prevFormState, [name]: reader.result };
        //         });
        //     };
        //     reader.readAsDataURL(file);
        // }
        
        setFormState((prevFormState) => {
            return { ...prevFormState, [name]: value };
        });
    };

    return { formState, handleOnChange };
};
