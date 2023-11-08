import { apiCreateCategoryVehicle } from "apis";
import "assets/css/modalCommon.css"
import { memo, useState } from "react";
import { toast } from "react-toastify";
import icons from "ultils/icons"

const ModalAddCategory = ({ open, onClose, handleUpdateTable }) => {
    const { CloseIcon } = icons;
    const [category, setCategory] = useState({
        vehicleCategoryName: ''
    })

    if (!open) return null;

    const handleReset = () => {
        setCategory({
            vehicleCategoryName: ''
        })
    }

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const res = await apiCreateCategoryVehicle(category);
        if (res.statusCode === 200) {
            handleReset();
            onClose();
            handleUpdateTable()
            toast.success(`${res.message}`)
        } else {
            toast.error(`${res.message}`)
        }
    };
    return (
        <div onClick={onClose} className='ModalCommonoverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='ModalCommonmodalContainer'
            >
                <form onSubmit={handleAddCategory} className="ModalCommonForm">
                    <p className='closeBtn' onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="tableformHeading">Create vehicle Category</p>
                        <div className="inputGroup">
                            <input
                                className="resetpasswordinput"
                                placeholder="Category Name"
                                value={category.vehicleCategoryName}
                                onChange={(e) => setCategory(prev => ({ ...prev, vehicleCategoryName: e.target.value }))}
                                type="text" />
                        </div>
                        <button type="submit" className="resetpasswordbtn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(ModalAddCategory)
