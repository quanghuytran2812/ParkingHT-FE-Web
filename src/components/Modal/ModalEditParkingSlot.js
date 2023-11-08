import { apiEditParkingSlot } from "apis";
import "assets/css/modalCommon.css";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import icons from "ultils/icons";

const ModalEditParkingSlot = ({ open, onClose, handleUpdateTable, dataParkingSlotEdit }) => {
    const { CloseIcon } = icons;
    const [parkingSlot, setParkingSlot] = useState({
        area: "",
        name: "",
        pricePerHour: "",
    });

    useEffect(() => {
        if (open) {
            setParkingSlot(dataParkingSlotEdit);
        }
    }, [open, dataParkingSlotEdit]);

    const handleEditParkingSlot = async (e) => {
        e.preventDefault();
        const res = await apiEditParkingSlot(parkingSlot);
        if (res && res.statusCode === 200) {
            onClose();
            handleUpdateTable();
            toast.success(`${res.message}`);
        } else {
            toast.error(`${res && res.message}`);
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
                        <div className="inputGroup">
                            <input
                                className="resetpasswordinput"
                                placeholder="Area //Ex: Đường số 1"
                                value={parkingSlot.area}
                                onChange={(e) => setParkingSlot((prev) => ({ ...prev, area: e.target.value }))}
                                type="text"
                            />
                        </div>
                        <div className="inputGroup">
                            <input
                                className="resetpasswordinput"
                                placeholder="Name //Ex: 101"
                                value={parkingSlot.name}
                                onChange={(e) => setParkingSlot((prev) => ({ ...prev, name: e.target.value }))}
                                type="text"
                            />
                        </div>
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