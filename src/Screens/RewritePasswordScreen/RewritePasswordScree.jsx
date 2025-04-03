import React from "react";
import { NavbarRegister } from "../../Components/NavbarRegister/NavbarRegister";
import FormRewritePassword from "../../Components/FormRewritePassword/FormRewritePassword";

const RewritePasswordScree = () => {
    return (
        <div className="login">
            <div className="navbar-register">
                <NavbarRegister />
            </div>
            <div className="form-reset-password">
                <FormRewritePassword />
            </div>
        </div>
    );
};

export default RewritePasswordScree;
