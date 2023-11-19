import { apiEditParkingSlot } from "apis";
import "assets/css/modalCommon.css";
import Select from "components/inputs/Select";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { statusParkingSlotData } from "ultils/contants";
import icons from "ultils/icons";

const ModalEditParkingSlot = ({ open, onClose, handleUpdateTable, dataParkingSlotEdit }) => {
    const { CloseIcon } = icons;
    const [parkingSlot, setParkingSlot] = useState({
        pricePerHour: "",
        parking_Slot_Status: ""
    });

    useEffect(() => {
        if (open) {
            setParkingSlot(dataParkingSlotEdit);
        }
    }, [open, dataParkingSlotEdit]);

    const handleStatusChange = (value) => {
        setParkingSlot(prevState => ({
            ...prevState,
            parking_Slot_Status: value
        }));
    };

    const handleEditParkingSlot = async (e) => {
        e.preventDefault();

        try {
            const res = await apiEditParkingSlot(parkingSlot);

            if (res?.statusCode === 200) {
                onClose();
                handleUpdateTable();
                toast.success(`Chỗ đậu xe được cập nhập thành công!`);
            }
        } catch (err) {
             // Handle error
             if (!err?.response) {
                toast.error('Không có phản hồi của máy chủ');
            } else if (err.response?.status === 400) {
                toast.error(`${err.response?.data.message}`)
            } else if (err.response?.status === 401) {
                toast.error('Không được phép!');
            } else {
                toast.error("Chỗ đậu xe được cập nhập thất bại!")
            }
            console.clear();
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
                <form onSubmit={handleEditParkingSlot} className="ModalCommonForm">
                    <p className="closeBtn" onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="tableformHeading">Edit Parking Slot</p>
                        <Select
                            itemValue={dataParkingSlotEdit.parking_Slot_Status}
                            options={statusParkingSlotData}
                            onChange={handleStatusChange}
                        />
                        <div className="inputGroup">
                            <input
                                className="resetpasswordinput"
                                placeholder="Price Per Hour //Ex: 14000"
                                value={parkingSlot.pricePerHour}
                                onChange={(e) => setParkingSlot((prev) => ({ ...prev, pricePerHour: e.target.value }))}
                                type="number"
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

export default memo(ModalEditParkingSlot);