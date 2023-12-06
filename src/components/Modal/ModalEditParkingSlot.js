import { apiEditParkingSlot } from "apis";
import "assets/css/modalCommon.css";
import Loader from "components/Loader";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import icons from "ultils/icons";

const ModalEditParkingSlot = ({ open, onClose, handleUpdateTable, dataParkingSlotEdit }) => {
    const { CloseIcon } = icons;
    const [isloading, setIsloading] = useState(false)
    const [parkingSlot, setParkingSlot] = useState({
        parkingSlotId: "",
        area: "",
        pricePerHour: "",
        vehicleCategory: ""
    });

    useEffect(() => {
        if (open) {
            setParkingSlot({
                parkingSlotId: dataParkingSlotEdit.parkingSlotId,
                area: dataParkingSlotEdit.area,
                pricePerHour: dataParkingSlotEdit.pricePerHour,
                vehicleCategory: dataParkingSlotEdit.vehicleCategory.vehicleCategoryId
            });
        }
    }, [open, dataParkingSlotEdit]);

    const handleEditParkingSlot = async (e) => {
        e.preventDefault();

        try {
            setIsloading(true)
            const res = await apiEditParkingSlot(parkingSlot);

            if (res?.statusCode === 200) {
                onClose();
                handleUpdateTable();
                toast.success(`Chỗ đậu xe được cập nhập thành công!`);
                setIsloading(false)
            }
        } catch (err) {
            // Handle error
            if (!err?.response) {
                toast.error('Không có phản hồi của máy chủ');
            } else if (err.response?.status === 400) {
                toast.error(`${err.response?.data.detail}`)
            } else if (err.response?.status === 401) {
                toast.error('Không được phép!');
            } else {
                toast.error("Chỗ đậu xe được cập nhập thất bại!")
            }
            console.clear();
        }
        setIsloading(false)
    };
    if (!open) return null;
    return (
        <>
            {isloading && <Loader />}
            <div onClick={onClose} className="ModalCommonoverlay">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="ModalCommonmodalContainer"
                >
                    <form onSubmit={handleEditParkingSlot} className="ModalCommonForm">
                        <p className="closeBtn" onClick={onClose}>
                            <CloseIcon />
                        </p>
                        <div className="resetpasswordForm">
                            <p className="tableformHeading">Cập nhập chỗ đậu xe</p>
                            <div style={{ marginBottom: '20px' }}>
                                <div className="inputGroup">
                                    <input
                                        className="resetpasswordinput"
                                        placeholder="Price Per Hour //Ex: 14000"
                                        value={parkingSlot.pricePerHour}
                                        onChange={(e) => setParkingSlot((prev) => ({ ...prev, pricePerHour: e.target.value }))}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="resetpasswordbtn">
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default memo(ModalEditParkingSlot);