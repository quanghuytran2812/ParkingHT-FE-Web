import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import icons from 'ultils/icons'
import _, { debounce } from "lodash"
import { apiDeleteParkingSlot, apiParkingSlot } from 'apis';
import CurrencyFormat from 'ultils/regex';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ModalAddParkingSlot, ModalEditParkingSlot } from 'components';

const ParkingSlot = () => {
    const { AddIcon, EditOutlinedIcon, DeleteOutlineIcon } = icons
    const [listParkingSlot, setlistParkingSlot] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [dataParkingSlotEdit, setdataParkingSlotEdit] = useState({});
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const getAllParkingSlot = async () => {
        let res = (await apiParkingSlot()) ?? {};
        if (res && res.data) {
            const tableData = res.data?.map((item, index) => ({ ...item, id: index + 1 }));
            setlistParkingSlot(tableData);
        }
    }

    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term) {
            let clonelistParkingSlot = _.cloneDeep(listParkingSlot);
            clonelistParkingSlot = clonelistParkingSlot.filter(item =>
                item.area.toLowerCase().includes(term.toLowerCase()) ||
                item.name.toLowerCase().includes(term.toLowerCase())
            );
            setlistParkingSlot(clonelistParkingSlot);
        } else {
            getAllParkingSlot();
        }
    }, 500);

    useEffect(() => {
        getAllParkingSlot();
    }, []);

    const handleUpdateTable = () => {
        getAllParkingSlot();
    };
    const handleEditParkingSlot = (parkingslot) => {
        setdataParkingSlotEdit(parkingslot);
        setOpenModalEdit(true);
    }

    const handleDeleteParkingSlot = (psid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you ready inactive this parking slot?",
            showCancelButton: true,
            confirmButtonColor: '#02aab0'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apiDeleteParkingSlot(psid);
                if (res.statusCode === 200) {
                    getAllParkingSlot();
                    toast.success("Category deleted successfully");
                } else toast.error(res.message);
            }
        })
    }


    const columns = [
        { field: 'id', headerName: '#', width: 90 },
        { field: 'area', headerName: 'AREA', width: 150 },
        { field: 'name', headerName: 'NAME', width: 150 },
        {
            field: 'pricePerHour', headerName: 'PRICE PER HOUR', width: 150, renderCell: (params) => {
                return (
                    <CurrencyFormat num={params.row.pricePerHour} />
                )
            }
        },
        {
            field: 'parking_Slot_Status', headerName: 'STATUS', width: 150, renderCell: (params) => {
                return (
                    <>
                        {params.row.parking_Slot_Status === 'AVAILABLE' ? (
                            <span className="tableStatusText TextAvailable">available</span>
                        ) : params.row.parking_Slot_Status === 'BUSY' ? (
                            <span className="tableStatusText TextOccupied">busy</span>
                        ) : null}
                    </>
                );
            }
        },
        {
            field: 'delFlag', headerName: 'OPERATIONAL STATES', width: 150, renderCell: (params) => {
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
        },
        {
            field: 'action', headerName: 'ACTION', width: 100, renderCell: (params) => {
                return (
                    <div>
                        <span onClick={() => handleEditParkingSlot(params.row)}><EditOutlinedIcon className="tableListEdit" /></span>
                        <span onClick={() => handleDeleteParkingSlot(params.row.parkingSlotId)}><DeleteOutlineIcon className="tableListDelete" /></span>
                    </div>
                )
            }
        }
    ];

    return (
        <>
            <div className="tableList">
                <h2 className="tableListTitle">Parking Slot List</h2>
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
                    <button type="button" onClick={() => setOpenModal(true)}><AddIcon className="tableCreateIcon" /><span>Create</span></button>
                </div>
                <DataGrid
                    rows={listParkingSlot}
                    columns={columns}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 6 },
                        }
                    }}
                />
            </div>
            <ModalAddParkingSlot
                open={openModal}
                onClose={() => setOpenModal(false)}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditParkingSlot 
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                dataParkingSlotEdit={dataParkingSlotEdit}
                handleUpdateTable={handleUpdateTable}
            />
        </>
    )
}

export default ParkingSlot
