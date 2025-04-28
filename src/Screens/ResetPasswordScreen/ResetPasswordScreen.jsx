import React from 'react'
import { FormResetPassword } from '../../Components/FormResetPassword/FormResetPassword'
import { NavbarRegister } from '../../Components/NavbarRegister/NavbarRegister'

const ResetPasswordScreen = () => {
  return (
      <div className="form-screen">
          <div className="navbar-register-screen">
              <NavbarRegister />
          </div>
          <div className="form-reset-password">
              <FormResetPassword />
          </div>
      </div>
  );
}

export default ResetPasswordScreen