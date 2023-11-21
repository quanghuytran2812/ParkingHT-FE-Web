import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';

const ModalDetailsVehicle = ({ open, onClose, dataInfo }) => {
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
                        <p className="tableformHeading hr">Details Vehicle</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Vehicle Owner: </p>
                                <p>Vehicle Name: </p>
                                <p>Number Plate: </p>
                                <p>Number Of Fouls: </p>
                                <p>Status: </p>
                                <p>Update Time: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p>{dataInfo.user.fullName}</p>
                                <p>{dataInfo.vehicleName}</p>
                                <p>{dataInfo.plateNumber}</p>
                                <p>{dataInfo.numberOfFouls}</p>
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

export default memo(ModalDetailsVehicle)
