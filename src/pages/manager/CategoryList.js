import { DataGrid } from '@mui/x-data-grid';
import { apiCategoryVehicle, apiDeleteCategoryVehicle } from 'apis';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import icons from 'ultils/icons'
import _, { debounce } from "lodash"

const CategoryList = () => {
    const { AddIcon, EditOutlinedIcon, DeleteOutlineIcon } = icons
    const [listCategory, setlistCategory] = useState([]);

    const getAllCategory = async () => {
        let res = (await apiCategoryVehicle()) ?? {};
        if (res.data && res.data.content) {
            const tableData = res.data.content?.map((item, index) => ({ ...item, id: index + 1 }));
            setlistCategory(tableData);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term) {
            let clonelistCategory = _.cloneDeep(listCategory);
            clonelistCategory = clonelistCategory.filter(item =>
                item.vehicleCategoryName.toLowerCase().includes(term.toLowerCase())
            );
            setlistCategory(clonelistCategory);
        } else {
            getAllCategory();
        }
    }, 500)

    const handleDeleteCategory = (uid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you ready inactive this vehicle category?",
            showCancelButton: true,
            confirmButtonColor: '#02aab0'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apiDeleteCategoryVehicle(uid);
                if (res.statusCode === 200) {
                    getAllCategory();
                    toast.success(res.message);
                } else toast.error(res.message);
            }
        })

    }
    const columns = [
        { field: 'id', headerName: '#', width: 90 },
        { field: 'vehicleCategoryName', headerName: 'VEHICLE CATEGORY', width: 250 },
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
        },
        {
            field: 'action', headerName: 'ACTION', width: 100, renderCell: (params) => {
                return (
                    <div>
                        <span ><EditOutlinedIcon className="tableListEdit" /></span>
                        <span onClick={() => handleDeleteCategory(params.row.vehicleCategoryId)} ><DeleteOutlineIcon className="tableListDelete" /></span>
                    </div>
                )
            }
        }
    ];
    return (
        <div className="tableList">
            <h2 className="tableListTitle">Vehicle Category List</h2>
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
                <button><AddIcon className="tableCreateIcon" /><span>Create</span></button>
            </div>
            <DataGrid
                rows={listCategory}
                columns={columns}
                autoHeight
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    }
                }}
            />
        </div>
    )
}

export default CategoryList
