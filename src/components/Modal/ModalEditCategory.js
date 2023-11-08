import "assets/css/modalCommon.css";
import { memo, useEffect, useState } from "react";
// import { toast } from "react-toastify";
import icons from "ultils/icons";

const ModalEditCategory = ({ open, onClose, handleUpdateTable, dataCategoryEdit }) => {
    const { CloseIcon } = icons;
    const [category, setCategory] = useState({
        vehicleCategoryName: ""
    });

    useEffect(() => {
        if (open) {
            setCategory(dataCategoryEdit);
        }
    }, [dataCategoryEdit]);

    const handleEditCategory = async (e) => {
        e.preventDefault();
    };

    if (!open) return null;

    return (
        <div onClick={onClose} className="ModalCommonoverlay">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="ModalCommonmodalContainer"
            >
                <form onSubmit={handleEditCategory} className="ModalCommonForm">
                    <p className="closeBtn" onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="tableformHeading">Edit vehicle Category</p>
                        <div className="inputGroup">
                            <input
                                className="resetpasswordinput"
                                placeholder="Category Name"
                                value={category.vehicleCategoryName}
                                onChange={(e) =>
                                    setCategory((prev) => ({
                                        ...prev,
                                        vehicleCategoryName: e.target.value
                                    }))
                                }
                                type="text"
                            />
                        </div>
                        <button type="submit" className="resetpasswordbtn">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(ModalEditCategory);