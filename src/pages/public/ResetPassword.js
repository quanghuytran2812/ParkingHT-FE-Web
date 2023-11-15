import "assets/css/resetPassword.css";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import icons from "ultils/icons"
import path from "ultils/path"

const ResetPassword = () => {
  const { LockResetIcon } = icons;
  const navigate = useNavigate();
  function resetPass() {
    navigate(path.LOGIN);
    toast.success("Reset password successfully!");
  }
  return (
    <div className="resetpassword">
      <div className="resetpasswordback">
        <Link to="/verifycode" className="resetpasswordbackLink">⇦ Back</Link>
      </div>
      <div className="resetpasswordForm">
        <p className="resetpasswordHeading">Reset Password</p>
        <LockResetIcon className="resetpasswordcheck" sx={{ fontSize: 60 }} />
        <div className="resetpasswordGroup">
          <input className="resetpasswordinput" placeholder="New Password" type="password" />
        </div>
        <div className="resetpasswordGroup">
          <input className="resetpasswordinput" placeholder="Confirm Password" type="password" />
        </div>
        <button onClick={resetPass} className="resetpasswordbtn">Reset Password</button>
      </div>
    </div>
  )
}

export default ResetPassword
