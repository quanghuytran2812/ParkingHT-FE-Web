import { apiChangePassUser } from "apis";
import "assets/css/modalCommon.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetUserById } from "store/user/authSlice";
import icons from "ultils/icons"

const ModalChangePass = ({ open, onClose }) => {
    const { CloseIcon, LockResetIcon } = icons;
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.auth.current);
    const [payload, setPayload] = useState({
        oldPass: '',
        newPass: ''
    })

    useEffect(() => {
        dispatch(fetchGetUserById())
      }, [dispatch]);

    const handleReset = () => {
        setPayload({
            oldPass: '',
            newPass: ''
        })
    }

    const handleChangePass = async (e) => {
        e.preventDefault();
        const res = await apiChangePassUser(userinfo.userId, payload);
        console.log(res)
        if(res.statusCode === 200){
            handleReset();
            onClose();
            toast.success('Password changed successfully!');
        }else if(res.statusCode === 400){
            toast.error(`${res.message}`)
        }
    };
    if (!open) return null;
    return (
        <div onClick={onClose} className='ModalCommonoverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='ModalCommonmodalContainer'
            >
                <div className="ModalCommonForm">
                    <p className='closeBtn' onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <form onSubmit={handleChangePass} className="resetpasswordForm">
                        <p className="resetpasswordHeading">Change Password</p>
                        <LockResetIcon className="resetpasswordcheck" fontSize="large" />
                        <div className="resetpasswordGroup">
                            <input className="resetpasswordinput"
                                value={payload.oldPass}
                                onChange={(e) => setPayload(prev => ({ ...prev, oldPass: e.target.value }))}
                                placeholder="Old Password"
                                type="password" />
                        </div>
                        <div className="resetpasswordGroup">
                            <input className="resetpasswordinput"
                                value={payload.newPass}
                                onChange={(e) => setPayload(prev => ({ ...prev, newPass: e.target.value }))}
                                placeholder="New Password"
                                type="password" />
                        </div>
                        <div className="resetpasswordGroup">
                            <input className="resetpasswordinput" placeholder="Confirm Password" type="password" />
                        </div>
                        <button type="submit" className="resetpasswordbtn">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalChangePass
