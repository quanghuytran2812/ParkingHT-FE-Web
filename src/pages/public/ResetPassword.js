import "assets/css/resetPassword.css";
import InputFieldPass from "components/inputs/inputFieldPass";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { validate } from "ultils/helpers";
import icons from "ultils/icons"
import path from "ultils/path"

const ResetPassword = () => {
  const { LockResetIcon } = icons;
  const navigate = useNavigate();
  const [invalidFields, setInvalidFields] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [payload, setPayload] = useState({
    password: '',
    confirmPassword: ''
  })

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordToggle2 = () => {
    setShowPassword2(!showPassword2);
  };

  function resetPass() {
    const invalids = validate(payload, setInvalidFields)
    if (invalids === 0) {
      navigate(path.LOGIN);
      toast.success("Reset password successfully!");
    }
  }
  return (
    <div className="resetpassword">
      <div className="resetpasswordback">
        <Link to="/verifycode" className="resetpasswordbackLink">⇦ Back</Link>
      </div>
      <div className="resetpasswordForm">
        <div className="resetpasswordFormText">
          <p className="resetpasswordHeading">Reset Password</p>
          <LockResetIcon className="resetpasswordcheck" sx={{ fontSize: 60 }} />
        </div>
        <InputFieldPass
          nameKey='password'
          className='resetpasswordGroup'
          classNameInput='resetpasswordinput'
          showPassword={showPassword}
          onClick={handlePasswordToggle}
          value={payload.password}
          onChange={(e) => setPayload(prev => ({ ...prev, password: e.target.value }))}
          placeholder='New Password'
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputFieldPass
          nameKey='confirmPassword'
          className='resetpasswordGroup'
          classNameInput='resetpasswordinput'
          showPassword={showPassword2}
          onClick={handlePasswordToggle2}
          value={payload.confirmPassword}
          onChange={(e) => setPayload(prev => ({ ...prev, confirmPassword: e.target.value }))}
          placeholder='Confirm Password'
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <button onClick={resetPass} className="resetpasswordbtn">Reset Password</button>
      </div>
    </div>
  )
}

export default ResetPassword
