import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';
import CurrencyFormat from 'ultils/regex';

const ModalDetailsBooking = ({ open, onClose, dataInfo }) => {
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
                        <p className="tableformHeading hr">CHI TIẾT ĐẶT CHỖ</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Mã đặt chỗ: </p>
                                <p>Người đặt: </p>
                                <p>Ngày bắt đầu: </p>
                                <p>Ngày kết thúc: </p>
                                <p>Ngày tạo: </p>
                                <p>Trạng thái: </p>
                                <p>Tổng tiền: </p>
                                <p>Cập nhật thời gian: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p>{dataInfo.booking_Id}</p>
                                <p>{dataInfo.user.fullName}</p>
                                <p>{moment(dataInfo.start_Date).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{moment(dataInfo.end_Date).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{moment(dataInfo.create_Date).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{dataInfo.booking_Status === "ONGOING"
                                    ? 'ĐANG ĐẶT CHỖ' : dataInfo.booking_Status === "COMPLETED"
                                    ? 'HOÀN THÀNH' : dataInfo.booking_Status === "CANCELED"
                                    ? 'ĐÃ HỦY' : ''
                                }</p>
                                <p><CurrencyFormat num={dataInfo.booking_Total} /></p>
                                <p>{moment(dataInfo.updateTime).format('DD/MM/YYYY, h:mm:ss A')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalDetailsBooking)
