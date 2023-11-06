import React, { memo } from 'react'

const Select = (options=[]) => {
    return (
        <div className="selectGroup">
            <select class="select-component">
                <option value="1">ROLE_DRIVER</option>
                <option value="3">ROLE_MANAGER</option>
                {/* {options?.map(el => {
                    <option value={el.code}>{el.value}</option>
                })} */}
            </select>
        </div>
    )
}

export default memo(Select)
