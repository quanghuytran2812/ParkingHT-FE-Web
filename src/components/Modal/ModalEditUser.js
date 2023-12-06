import "assets/css/modalCommon.css"
import Loader from "components/Loader";
import Select from "components/inputs/Select";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRoleUser } from "store/user/userSlide";
import { roleUserData } from "ultils/contants";
import icons from "ultils/icons"

const ModalEditUser = ({ open, onClose, dataUserEdit, handleTableU }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const [role, setRole] = useState(dataUserEdit.role)
    const { loading } = useSelector((state) => state.user);

    if (!open) return null;

    const handleRoleChange = (value) => {
        setRole(value);
    };

    const handleEditRole = async (e) => {
        e.preventDefault();

        let updateRoleU = {
            userId: dataUserEdit.userId,
            role: role
        }
        dispatch(updateRoleUser(updateRoleU))
            .then((result) => {
                onClose();
                handleTableU()
            })
            .catch((error) => {
                console.log(error)
            });
    };

    return (
        <>
            {loading && <Loader />}
            <div onClick={onClose} className='ModalCommonoverlay'>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className='ModalCommonmodalContainer'
                >
                    <form onSubmit={handleEditRole} className="ModalCommonForm">
                        <p className='closeBtn' onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <div className="resetpasswordForm">
                            <p className="resetpasswordHeading">Cập nhập người dùng</p>
                            <Select
                                itemValue={dataUserEdit.role}
                                options={roleUserData}
                                onChange={handleRoleChange}
                            />
                            <button className="resetpasswordbtn">Cập nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(ModalEditUser)
