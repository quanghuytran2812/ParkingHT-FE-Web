import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import _, { debounce } from "lodash"
import { apiVehicle } from 'apis';

const VehicleList = () => {
    const [listVehicle, setlistVehicle] = useState([]);

    const getAllVehicle = async () => {
        let res = (await apiVehicle()) ?? {};
        if (res && res.data) {
            const tableData = res.data?.map((item, index) => ({ ...item, id: index + 1 }));
            setlistVehicle(tableData);
        }
    }

    useEffect(() => {
        getAllVehicle();
    }, []);

    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term) {
            let clonelistCategory = _.cloneDeep(listVehicle);
            clonelistCategory = clonelistCategory.filter(item =>
                item.vehicleName.toLowerCase().includes(term.toLowerCase()) ||
                item.plateNumber.toLowerCase().includes(term.toLowerCase())
            );
            setlistVehicle(clonelistCategory);
        } else {
            getAllVehicle();
        }
    }, 500)

    const columns = [
        { field: 'id', headerName: '#', width: 90 },
        { field: 'vehicleName', headerName: 'VEHICLE', width: 200 },
        { field: 'user', headerName: 'USER', width: 200, renderCell: (params) => {
            return (
                <span>{params.row.user.fullName}</span>
            )
        }},
        { field: 'plateNumber', headerName: 'PLATENUMBER', width: 150 },
        { field: 'numberOfFouls', headerName: 'NUMBER OF FOULS', width: 150, align: 'center' },
        {
            field: 'delFlag', headerName: 'STATUS', width: 150, renderCell: (params) => {
                return (
                    <>
                        {params.row.delFlag ? (
                            <span className="tableStatusText TextSecond">inactive</span>
                        ) : (
                            <span className="tableStatusText">active</span>
                        )}
                    </>
                )
            }
        }    
    ];
    return (
        <div className="tableList">
            <h2 className="tableListTitle">Vehicle List</h2>
            <div className="tableListBoxContainer">
                <div className="tableListinput-container">
                    <input type="text"
                        className="input"
                        onChange={(e) => handleSearch(e)}
                        placeholder="search..." />
                    <span className="icon">
                        <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path opacity="1" d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path opacity="1" d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path opacity="1" d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
            <DataGrid
                rows={listVehicle}
                columns={columns}
                autoHeight
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 6 },
                    }
                }}
            />
        </div>
    )
}

export default VehicleList
