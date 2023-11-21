import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';

const ModalDetailsUser = ({ open, onClose, dataInfo }) => {
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
                        <p className="tableformHeading hr">Details User</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Full Name: </p>
                                <p>Birthday: </p>
                                <p>Phone Number: </p>
                                <p>Email: </p>
                                <p>Created Date: </p>
                                <p>Role: </p>
                                <p>Status: </p>
                                <p>Update Time: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p>{dataInfo.fullName}</p>
                                <p>{moment(dataInfo.birthday).format('DD/MM/YYYY')}</p>
                                <p>{dataInfo.phoneNumber}</p>
                                <p>{dataInfo.email}</p>
                                <p>{moment(dataInfo.createdDate).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{dataInfo.role}</p>
                                <p>{dataInfo.delFlag ? "Inactive" : "Active"}</p>
                                <p>{moment(dataInfo.updateTime).format('DD/MM/YYYY, h:mm:ss A')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalDetailsUser)
