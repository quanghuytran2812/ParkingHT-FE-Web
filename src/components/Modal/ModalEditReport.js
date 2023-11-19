import "assets/css/modalCommon.css"
import Select from "components/inputs/Select";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateReport } from "store/report/reportSlice";
import { statusReportData } from "ultils/contants";
import icons from "ultils/icons"

const ModalEditReport = ({ open, onClose, dataReportEdit, handleUpdateTable }) => {
    const dispatch = useDispatch();
    const { CloseIcon } = icons;
    const [processingStatus, setProcessingStatus] = useState(dataReportEdit.processingStatus);

    if (!open) return null;

    const handleStatusChange = (value) => {
        setProcessingStatus(value);
    };

    const handleEditReport = async (e) => {
        e.preventDefault();
        dispatch(updateReport({ ...dataReportEdit, processingStatus }))
        .then((result) => {
            onClose();
            handleUpdateTable()
        })
        .catch((error) => {
            console.log(error)
        });
    };
    return (
        <div onClick={onClose} className='ModalCommonoverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='ModalCommonmodalContainer'
            >
                <form onSubmit={handleEditReport} className="ModalCommonForm">
                    <p className='closeBtn' onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="resetpasswordHeading">Edit Report</p>
                        <Select
                            itemValue={dataReportEdit.processingStatus}
                            options={statusReportData}
                            onChange={handleStatusChange}
                        />
                        <button type="submit" className="resetpasswordbtn">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(ModalEditReport)
