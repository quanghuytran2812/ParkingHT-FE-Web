// import { useEffect } from "react";
import "assets/css/modalCommon.css"
import Select from "components/inputs/Select";
import { memo } from "react";
import icons from "ultils/icons"

const ModalEditUser = ({ open, onClose, dataUserEdit }) => {
    const { CloseIcon } = icons;

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
                    <div className="resetpasswordForm">
                        <p className="resetpasswordHeading">Edit User</p>
                        <Select />
                        <button className="resetpasswordbtn">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalEditUser)
