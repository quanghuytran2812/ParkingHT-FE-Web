import "assets/css/modalCommon.css";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCategory } from "store/category/categorySlice";
import icons from "ultils/icons";

const ModalEditCategory = ({ open, onClose, handleUpdateTable, dataCategoryEdit }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const [category, setCategory] = useState({
        vehicleCategoryName: ""
    });
    const { error } = useSelector((state) => state.category);

    useEffect(() => {
        if (open) {
            setCategory(dataCategoryEdit);
        }
    }, [open, dataCategoryEdit]);

    const handleEditCategory = async (e) => {
        e.preventDefault();
        dispatch(updateCategory(category))
        .then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success("Category updated successfully");
                onClose();
                handleUpdateTable()
            } else {
                toast.error(res.message);
            }
        })
        .catch((error) => {
            toast.error(error.message);
        });
    };

    if (error) {
        toast.error(`${error}`);
    }

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