import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
// import moment from 'moment';

const ModalInfoCarBook = ({ open, onClose, dataInfo }) => {
    const { CloseIcon } = icons;
    if (!open) return null;
    return (
        <div onClick={onClose} className="ModalCommonoverlay">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="ModalCommonmodalContainer"
            >
                <div className="ModalCommonForm">
                    <p className="closeBtn" onClick={onClose}>
                        <CloseIcon />
                    </p>
                    <div className="resetpasswordForm">
                        <p className="tableformHeading hr">THÔNG TIN CHI TIẾT</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Biển số xe: </p>
                                <p>Điện thoại: </p>
                                <p>Loại xe: </p>
                                <p>Ngày bắt đầu: </p>
                                <p>Ngày kết thúc: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalInfoCarBook)
