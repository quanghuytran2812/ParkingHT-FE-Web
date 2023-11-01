import "../assets/css/modalchangePass.css"
import icons from "../ultils/icons"

const ModalChangePass = ({ open, onClose }) => {
    const {CloseIcon,LockResetIcon} = icons;

    if (!open) return null;
    return (
        <div onClick={onClose} className='ModalChangePassoverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='ModalChangePassmodalContainer'
            >
                <div className="ModalChangePassForm">
                    <p className='closeBtn' onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="resetpasswordHeading">Change Password</p>
                        <LockResetIcon className="resetpasswordcheck" fontSize="large" />
                        <div className="resetpasswordGroup">
                            <input class="resetpasswordinput" placeholder="Old Password" type="password" />
                        </div>
                        <div className="resetpasswordGroup">
                            <input class="resetpasswordinput" placeholder="New Password" type="password" />
                        </div>
                        <div className="resetpasswordGroup">
                            <input class="resetpasswordinput" placeholder="Confirm Password" type="password" />
                        </div>
                        <button className="resetpasswordbtn">Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalChangePass
