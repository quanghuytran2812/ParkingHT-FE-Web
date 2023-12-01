import "assets/css/modalCommon.css";
import InputField from "components/inputs/InputField";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "store/category/categorySlice";
import { validate } from "ultils/helpers";
import icons from "ultils/icons";

const ModalEditCategory = ({ open, onClose, handleUpdateTable, dataCategoryEdit }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const [invalidFields, setInvalidFields] = useState([]);
    const [category, setCategory] = useState({
        vehicleCategoryName: ""
    });

    useEffect(() => {
        if (open) {
            setCategory({
                vehicleCategoryName: dataCategoryEdit.vehicleCategoryName
            });
        }
    }, [open, dataCategoryEdit]);

    const handleEditCategory = async (e) => {
        e.preventDefault();
        const invalids = validate(category, setInvalidFields)
        if (invalids === 0) {
            const updatedCategory = {
                vehicleCategoryId: dataCategoryEdit.vehicleCategoryId,
                vehicleCategoryName: category.vehicleCategoryName,
            };
            dispatch(updateCategory(updatedCategory))
                .then((result) => {
                    onClose();
                    handleUpdateTable()
                })
                .catch((error) => {
                    console.log(error)
                });
        }
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
                        <p className="tableformHeading">Cập nhập loại xe</p>
                        <InputField
                            nameKey='vehicleCategoryName'
                            className='inputGroup'
                            classNameInput='resetpasswordinput'
                            value={category.vehicleCategoryName}
                            onChange={(e) => setCategory(prev => ({ ...prev, vehicleCategoryName: e.target.value }))}
                            placeholder="Tên loại xe"
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <button type="submit" className="resetpasswordbtn">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(ModalEditCategory);