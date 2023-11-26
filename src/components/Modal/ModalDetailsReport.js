import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';

const ModalDetailsReport = ({ open, onClose, dataInfo }) => {
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
                        <p className="tableformHeading hr">Chi tiết đánh giá</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                {dataInfo.vehiclePlateNumber !== "" && dataInfo.vehiclePlateNumber.length > 0
                                    ? <p>Biển số xe: </p> : ''
                                }
                                <p>Ngày tạo: </p>
                                <p>Ngày xử lý: </p>
                                <p>Trạng thái xử lý: </p>
                                <p>Trạng thái hoạt động: </p>
                                <p>Cập nhật thời gian: </p>
                                <p>Nội dung: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                {dataInfo.vehiclePlateNumber !== "" && dataInfo.vehiclePlateNumber.length > 0
                                    ? <p>{dataInfo.vehiclePlateNumber}</p> : ''
                                }
                                <p>{moment(dataInfo.createDate).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{ dataInfo.processingDate !== null
                                    ? moment(dataInfo.processingDate).format('DD/MM/YYYY, h:mm:ss A')
                                    : 'Not yet processed'
                                }</p>
                                <p>{dataInfo.processingStatus === 1 ? "Completed" : "Processing"}</p>
                                <p>{dataInfo.delFlag ? "Inactive" : "Active"}</p>
                                <p>{moment(dataInfo.updateTime).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{dataInfo.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalDetailsReport)
