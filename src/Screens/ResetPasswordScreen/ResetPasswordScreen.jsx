import React from 'react'
import { FormResetPassword } from '../../Components/FormResetPassword/FormResetPassword'
import { NavbarRegister } from '../../Components/NavbarRegister/NavbarRegister'

const ResetPasswordScreen = () => {
  return (
    <div className="login">
                <div className="navbar-register">
                    <NavbarRegister />
                </div>
                <div className="form-reset-password">
                    <FormResetPassword />
                </div>
            </div>
  )
}

export default ResetPasswordScreen