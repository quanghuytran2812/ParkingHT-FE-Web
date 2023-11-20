import "assets/css/modalCommon.css"
import InputField from "components/inputs/InputField";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "store/category/categorySlice";
import { validate } from "ultils/helpers";
import icons from "ultils/icons"

const ModalAddCategory = ({ open, onClose, handleUpdateTable }) => {
    const dispatch = useDispatch();
    const [invalidFields, setInvalidFields] = useState([]);
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

    const handleAddCategory = (e) => {
        e.preventDefault();
        const invalids = validate(category, setInvalidFields)
        if (invalids === 0) {
            dispatch(createCategory(category))
                .then((result) => {
                    handleReset();
                    onClose();
                    handleUpdateTable();
                })
                .catch((error) => {
                    console.log(error)
                });
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
                        <InputField
                            nameKey='vehicleCategoryName'
                            className='inputGroup'
                            classNameInput='resetpasswordinput'
                            value={category.vehicleCategoryName}
                            onChange={(e) => setCategory(prev => ({ ...prev, vehicleCategoryName: e.target.value }))}
                            placeholder="Category Name"
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <button type="submit" className="resetpasswordbtn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(ModalAddCategory)
