import { apiAddParkingSlot } from "apis";
import "assets/css/modalCommon.css"
import { memo, useState } from "react";
import { toast } from "react-toastify";
import icons from "ultils/icons"

const ModalAddParkingSlot = ({ open, onClose, handleUpdateTable }) => {
    const { CloseIcon } = icons;
    const [parkingSlot, setparkingSlot] = useState({
        area: '',
        name: '',
        pricePerHour: ''
    })

    if (!open) return null;

    const handleReset = () => {
        setparkingSlot({
            area: '',
            name: '',
            pricePerHour: ''
        })
    }

    const handleAddParkingSlot = async (e) => {
        e.preventDefault();
        try {
            const res = await apiAddParkingSlot(parkingSlot);
            if (res.statusCode === 200) {
                handleReset();
                onClose();
                handleUpdateTable();
                toast.success("Chỗ đậu xe được tạo mới thành công!");
            }
        } catch (err) {
            // Handle error
            if (!err?.response) {
                toast.error('Không có phản hồi của máy chủ');
            } else if (err.response?.status === 400) {
                toast.error(`Tên trùng lặp trong một khu vực!`)
            } else if (err.response?.status === 401) {
                toast.error('Không được phép!');
            } else {
                toast.error("Chỗ đậu xe được tạo mới thất bại!")
            }
            console.clear();
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
                <form onSubmit={handleAddParkingSlot} className="ModalCommonForm">
                    <p className='closeBtn' onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="tableformHeading">Create Parking Slot</p>
                        <div className="inputGroup">
                            <input
                                className="resetpasswordinput"
                                placeholder="Area //Ex: Đường số 1"
                                value={parkingSlot.area}
                                onChange={(e) => setparkingSlot(prev => ({ ...prev, area: e.target.value }))}
                                type="text" />
                        </div>
                        <div className="inputGroup">
                            <input
                                className="resetpasswordinput"
                                placeholder="Name //Ex: 101"
                                value={parkingSlot.name}
                                onChange={(e) => setparkingSlot(prev => ({ ...prev, name: e.target.value }))}
                                type="text" />
                        </div>
                        <div className="inputGroup">
                            <input
                                className="resetpasswordinput"
                                placeholder="Price Per Hour //Ex: 14000"
                                value={parkingSlot.pricePerHour}
                                onChange={(e) => setparkingSlot(prev => ({ ...prev, pricePerHour: e.target.value }))}
                                type="number" />
                        </div>
                        <button type="submit" className="resetpasswordbtn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(ModalAddParkingSlot)