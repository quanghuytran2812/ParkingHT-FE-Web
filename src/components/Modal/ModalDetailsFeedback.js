import React, { memo } from 'react'
import icons from 'ultils/icons';
import "assets/css/modalCommon.css"
import moment from 'moment';

const ModalDetailsFeedback = ({ open, onClose, dataInfo }) => {
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
                        <p className="tableformHeading hr">Details Feedback</p>

                        <div className='tableDetail'>
                            <div className='tableLeft col-sm-4'>
                                <p>Rank Star: </p>
                                <p>Create Date: </p>
                                <p>Status: </p>
                                <p>Content: </p>
                            </div>
                            <div className='tableRight col-sm-8'>
                                <p>{dataInfo.rankStar}</p>                             
                                <p>{moment(dataInfo.createDate).format('DD/MM/YYYY, h:mm:ss A')}</p>
                                <p>{dataInfo.isFeedback === 1 ? "Done" : "Not yet"}</p>
                                <p>{dataInfo.content !== null ? dataInfo.content : 'No idea'}</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalDetailsFeedback)
