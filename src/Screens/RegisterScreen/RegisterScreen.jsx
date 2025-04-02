import { NavbarRegister } from "@/Components/NavbarRegister/NavbarRegister.jsx";
import { FormRegister } from "@/Components/FormRegister/FormRegister.jsx";
import "./RegisterScreen.css";

const RegisterScreen = () => {
    return (
        <div className="register">
            <div className="navbar-register">
                <NavbarRegister />
            </div>
            <div className="form-register">

                <FormRegister />
            </div>
        </div>
    );
};

export default RegisterScreen;
